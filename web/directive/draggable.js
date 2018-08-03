/**
 * 拖拽指令
 */
import Vue from 'vue';
import { setUuid, loadComponents } from '@/util/helper';

const DROP_HIGHLIGHT = 'drop-highlight';


function updatePage(e, ctx, that, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex) {
  ctx.$store.dispatch('editor/updatePage', {
    item: item,
    itemIndex: itemIndex,
    level: ctx.level,
    levelIndex: ctx.levelIndex,
    dragType: dragType,
    oldLevel: oldLevel,
    oldLevelIndex: oldLevelIndex,
    oldItemIndex: oldItemIndex
  });
  ctx.$forceUpdate();
}

function toggleDragClass(el, mark) {
  if (mark) {
    if (!el.classList.contains(DROP_HIGHLIGHT)) {
      el.classList.add(DROP_HIGHLIGHT);
    }
  } else {
    el.classList.remove(DROP_HIGHLIGHT);
  }
}
/**
 * 计算目的地索引
 * @param {} event 
 * @param {*} el 
 * @param {*} ctx 
 */
function getItemIndex(event, el, ctx, dragType) {
  // 先计算水平排列
  let children = el.children
  if (ctx.renderType === 'tree') {
    // tree-collapse_operate   .multi-tree_children
    children = el.children[1].children
  }
  const childrenLength = children.length;
  const { pageX, pageY } = event;
  let itemIndex = 0;

  let instanceLast = { x: 0, y: 0 }
  if (childrenLength >= 1) {
    instanceLast = children[childrenLength - 1].getBoundingClientRect();
  }
  debugger

  for (let i = 0; i < childrenLength; i++) {
    const instanceBefore = children[i].getBoundingClientRect();

    if (ctx.renderType === 'tree') {
      // 只比较纵向
      if (pageY > (instanceLast.y + instanceLast.height)) {
        // 在最后一个之后
        if (dragType === 'add') {
          itemIndex = childrenLength;
        } else {
          itemIndex = childrenLength - 1;
        }
        break;
      }

      if (pageY >= instanceBefore.y && pageY < (instanceBefore.y + instanceBefore.height)) {
        itemIndex = i;
        break;
      } else {
        itemIndex = i;
      }
    } else {

      if (pageX > (instanceLast.x + instanceBefore.width) || pageY > (instanceLast.y + instanceLast.height)) {
        // 在最后一个之后
        if (dragType === 'add') {
          itemIndex = childrenLength;
        } else {
          itemIndex = childrenLength - 1;
        }
        break;
      }

      if (pageX >= instanceBefore.x && pageX < (instanceBefore.x + instanceBefore.width) && pageY >= instanceBefore.y && pageY < (instanceBefore.y + instanceBefore.height)) {
        itemIndex = i;
        break;
      } else {
        itemIndex = i;
      }
    }

  }
  console.log('drag itemIndex: ' + itemIndex)

  return itemIndex;

}

function handleDragStart(e, ctx) {
  console.log('dragstart--------', ctx.levelIndex, ctx, ctx.$store.getters['editor/isDragging']
  )

  const isDragging = ctx.$store.getters['editor/isDragging'];
  if (isDragging) {
    return false;
  }
  // e.preventDefault();
  // e.stopPropagation();
  const data = {
    dragType: 'move',
    item: ctx.item,
    oldLevel: ctx.level,
    oldLevelIndex: ctx.levelIndex,
    oldItemIndex: ctx.itemIndex
  }
  ctx.$store.dispatch('editor/setDragging', true);
  e.dataTransfer.setData('dragElementData', JSON.stringify(data));
}

function handleDragEnter(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();

  // 检测是否允许drop
  toggleDragClass(this, true);
}

function handleDragEnd(e, ctx) {
  ctx.$store.dispatch('editor/setDragging', false);
  console.log("*********** render drag item Dragend ***********");
  e.dataTransfer.clearData("dragElementData");
}

function handleDrop(e, ctx) {
  console.log('drop--------', ctx.levelIndex, ctx)
  // e.preventDefault();
  e.stopPropagation();

  const elementData = e.dataTransfer.getData('dragElementData');

  if (typeof elementData !== 'undefined' && elementData !== '') {
    const { item, dragType, oldLevel, oldLevelIndex, oldItemIndex } = JSON.parse(elementData)
    // 添加children
    // 先管clone widget 直接add的

    const itemIndex = getItemIndex(e, this, ctx, dragType)

    if (dragType === 'add') {
      setUuid(
        item,
        itemIndex,
        this.level,
        this.levelIndex,
        ctx.$store.getters['editor/currentThemeStyle']
      );
    }
    
    if (dragType === 'move') {
      // 拖拽到自身
      if (ctx.levelIndex === oldLevelIndex) {
        console.log('drag ===== drop ')
        toggleDragClass(this, false);
        ctx.$store.dispatch('editor/setDragging', false);
        e.dataTransfer.clearData('dragElementData');
        e.dataTransfer.clearData('dragElementType');
        return;
      }
    }


    if (!item.is_register) {
      loadComponents(item.fileUrl, () => {
        window[item.component_umd_name].install(Vue);
        // Vue.use(newItem.component_umd_name)
        console.log(Vue.options.components, '注册组件');
        // TODO  安装一个记录一次， 再次拖拽不再安装
        item.is_register = true;
        updatePage(e, ctx, this, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex)
      })
    } else {
      updatePage(e, ctx, this, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex)
    }




    toggleDragClass(this, false);
  } else {
    console.warn('未获取到drag数据');
  }

  ctx.$store.dispatch('editor/setDragging', false);
  e.dataTransfer.clearData('dragElementData');

}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  toggleDragClass(this, false);
}

export default {
  bind(el, binding, vnode) {
    const ctx = vnode.context
    el._handleDrop = function (e) {
      handleDrop.call(this, e, ctx);
    };

    el._handleDragStart = function (e) {
      handleDragStart.call(this, e, ctx);
    };

    el._handleDragEnd = function (e) {
      handleDragEnd.call(this, e, ctx);
    };


    // 最外层容器不能被拖拽
    if (!el.classList.contains('iphone-container') && !el.classList.contains('itree-manage')) {
      el.draggable = true;
      el.addEventListener('dragstart', el._handleDragStart);
      el.addEventListener('dragend', el._handleDragEnd);
    }
    // 对于有children才有drop， 对于无childern 只有drag
    // ctx.tag_name  lego-row  lego-col
    if (ctx.draggable === true || ctx.item.draggable === true) {
      el.addEventListener('dragenter', handleDragEnter);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('drop', el._handleDrop);
      el.addEventListener('dragleave', handleDragLeave);
    }



  },
  unbind(el) {
    el.removeEventListener('dragend', el._handleDragStart);
    el.removeEventListener('dragenter', handleDragEnter);
    el.removeEventListener('dragover', handleDragOver);
    el.removeEventListener('drop', el._handleDrop);
    el.removeEventListener('dragleave', handleDragLeave);
  }
};
