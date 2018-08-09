/**
 * 拖拽指令
 */
import Vue from 'vue';
import { setUuid, loadComponents } from '@/util/helper';

const DROP_HIGHLIGHT = 'drop-highlight';

const isDragging = 'isDragging'

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

function toggleContainerDragClass(el, ctx, mark) {

  let container = 'iphone-container';
  if (ctx.renderType === 'tree') {
    container = 'tree-manage'
  }
  container = document.querySelector(`.${container}`)
  if (mark) {
    if (!container.classList.contains(isDragging)) {
      container.classList.add(isDragging);
    }
  } else {
    container.classList.remove(isDragging);
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
    if(!el.classList.contains('tree-manage')) {
      // tree-collapse_operate   .multi-tree_children
      children = el.children[1].children
    }
  }
  const childrenLength = children.length;
  const { pageX, pageY } = event;
  let itemIndex = 0;

  let instanceLast = { x: 0, y: 0 }
  let instanceFirst = { x: 0, y: 0 }
  if (childrenLength >= 1) {
    instanceFirst = children[0].getBoundingClientRect();
    instanceLast = children[childrenLength - 1].getBoundingClientRect();
  }

  for (let i = 0; i < childrenLength; i++) {
    const instanceBefore = children[i].getBoundingClientRect();
    let instanceNext = {x: 0, y: 0};
    if(i < childrenLength - 1) {
      instanceNext = children[i + 1].getBoundingClientRect();
    }

    if (ctx.renderType === 'tree') {
      // 只比较纵向

      if (pageY < instanceFirst.y ) {
        // 在第一个之前
        itemIndex = 0;
        break;
      }

      if (pageY > (instanceLast.y + instanceLast.height)) {
        // 在最后一个之后
        if (dragType === 'add') {
          itemIndex = childrenLength + 1;
        } else {
          itemIndex = childrenLength;
        }
        break;
      }

      if (pageY >= instanceBefore.y && pageY < instanceBefore.bottom) {
        itemIndex = i;
        break;
      } else if(pageY >= instanceBefore.y && (pageY < instanceNext.y)) {
        // 处在margin之间的距离
        // itemIndex = i + 1
        itemIndex = i
        break;
      } else {
        itemIndex = i;
      }

    } else {

      if (pageX < instanceFirst.x  || pageY < instanceFirst.y ) {
        // 在第一个之前
        itemIndex = 0;
        break;
      }

      if (pageX > (instanceLast.x + instanceBefore.width) || pageY > (instanceLast.y + instanceLast.height)) {
        // 在最后一个之后
        if (dragType === 'add') {
          itemIndex = childrenLength + 1;
        } else {
          itemIndex = childrenLength;
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
  console.log('dragstart--------', ctx.levelIndex, ctx)


  const data = {
    dragType: 'move',
    item: ctx.item,
    oldLevel: ctx.level,
    oldLevelIndex: ctx.levelIndex,
    oldItemIndex: ctx.itemIndex
  }
  e.dataTransfer.setData('dragElementData', JSON.stringify(data));
  toggleContainerDragClass(this, ctx, true);
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
  toggleContainerDragClass(this, ctx, false);
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
        e.dataTransfer.clearData('dragElementData');
        e.dataTransfer.clearData('dragElementType');
        return;
      }
    }


    if (!item.is_register) {

      const registerComponentList =  ctx.$store.getters['editor/registerComponentList']
      if(registerComponentList[item.component_umd_name]) {
        item.is_register = true;

        updatePage(e, ctx, this, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex)

      } else {

        loadComponents(item.fileUrl, () => {
          window[item.component_umd_name].install(Vue);
          // Vue.use(newItem.component_umd_name)
          console.log(Vue.options.components, '注册组件');
          // TODO  安装一个记录一次， 再次拖拽不再安装
          item.is_register = true;
          ctx.$store.dispatch('editor/addRegisterComponentItem', {
            name: item.component_umd_name,
            fileUrl: item.fileUrl
          });
  
          updatePage(e, ctx, this, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex)
  
        })
      }

    } else {
      updatePage(e, ctx, this, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex)
    }




    toggleDragClass(this, false);
  } else {
    console.warn('未获取到drag数据');
  }

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
      e.stopPropagation();
      handleDragStart.call(this, e, ctx);
    };

    el._handleDragEnd = function (e) {
      e.stopPropagation();
      handleDragEnd.call(this, e, ctx);
    };


    // 最外层容器不能被拖拽
    if (!el.classList.contains('iphone-container') && !el.classList.contains('tree-manage')) {
      el.draggable = true;
      el.addEventListener('dragstart', el._handleDragStart);
      el.addEventListener('dragend', el._handleDragEnd);
    }
    // 对于有children才有drop， 对于无childern 只有drag
    // ctx.tag_name  lego-row  lego-col
    if (ctx.draggable === true || ctx.item.draggable === true) {
      el.setAttribute('data-dropable', true)
      el.addEventListener('dragenter', handleDragEnter);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('drop', el._handleDrop);
      el.addEventListener('dragleave', handleDragLeave);
    }



  },
  unbind(el) {
    el.removeEventListener('dragstart', el._handleDragStart);
    el.removeEventListener('dragend', el._handleDragEnd);
    el.removeEventListener('dragenter', handleDragEnter);
    el.removeEventListener('dragover', handleDragOver);
    el.removeEventListener('drop', el._handleDrop);
    el.removeEventListener('dragleave', handleDragLeave);
  }
};
