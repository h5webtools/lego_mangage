/**
 * helper
 */
import Vue from "vue";

export function serializeMemberValue(arr = []) {
  if (!Array.isArray(arr)) arr = [];
  return `,${arr.join(',')},`;
}

export function parseMemberValue(str = '') {
  if (typeof str !== 'string') str = '';
  str = str.slice(1, -1);
  if (!str) return [];
  return str.split(',');
}

export function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
/**
 * 根据索引位置修改数据（以children 为集体进行替换）
 * @param {*} levelIndex 索引顺序（例如0-2）
 * @param {*} obj 源数据
 * @param {*} changeData  找到的位置修改为新数据 
 */
export function setPageData(levelIndex, obj, changeData) {
  var index = levelIndex.shift()
  if (!obj[index]) {
    obj[index] = {
      children: {}
    }
  }
  if (!obj[index].children) {
    obj[index].children = {}
  }

  if (levelIndex.length) {
    setPageData(levelIndex, obj[index].children, changeData)
  } else {
    obj[index].children = changeData
  }

  // a = [{children: [{a: 2}, {b: 2, children: [{test: 1}, {test2: 3}]}]}]
  // a[0]['children'][1]['children']
}
/**
 * 
 * @param {*} levelIndex 
 * @param {*} pageData 
 * @param {*} type 默认0 找的是 找children； 1 是当前位置直接找元素
 */
export function getLevelPageDataChildren(levelIndex, pageData, type = 0) {
  debugger
  let pageDataChildren = [];
  if(levelIndex === 'top' || levelIndex === '0') {

    pageDataChildren = pageData
  } else if(type === 1) {

    const oldIndexArr = levelIndex.split('-');
    const oldLastItemIndex = oldIndexArr.pop();
    const realOldLevelIndex = oldIndexArr.join('-');

    if(realOldLevelIndex === 'top' || realOldLevelIndex === '0') {
      pageDataChildren = pageData[oldLastItemIndex]
    } else {
      oldIndexArr.shift();
      pageDataChildren = getLevelPageData(oldIndexArr, pageData, type)[oldLastItemIndex]
    }

  } else {
    const indexArr = levelIndex.split('-')
    indexArr.shift();
    pageDataChildren = getLevelPageData(indexArr, pageData, type);
  }

  return pageDataChildren;
}

/**
 * 
 * @param {array} levelIndex 
 * @param {*} obj 
 */
export function getLevelPageData(levelIndex, obj) {
  var index = levelIndex.shift()
  if (!obj[index]) {
    obj[index] = {
      children: {}
    }
  }
  if (!obj[index].children) {
    obj[index].children = {}
  }

  if (levelIndex.length) {
    return getLevelPageData(levelIndex, obj[index].children)
  } else {
    return obj[index].children
  }

  // a = [{children: [{a: 2}, {b: 2, children: [{test: 1}, {test2: 3}]}]}]
  // a[0]['children'][1]['children']
}

/**
 * 直接设置某单个item的key（extendProps.isLocked）
 * @param {*} levelIndex key的连续key
 * @param {*} obj 
 * @param {*} changeData 
 */
export function setPageDataItemByKey(levelIndex, obj, changeData) {
  var index = levelIndex.shift()
  /*   if (!obj[index]) {
        obj[index] = {}
    } */

  if (levelIndex.length) {
    setPageDataItemByKey(levelIndex, obj[index], changeData)
  } else {
    obj[index] = changeData
  }
}

/**
 * 遍历修改这个值中的uuid属性 并整合 业务组件中prop到children; 以及改变themeExtend 对应值
 * @param {*} item 
 * @param {*} index  当前数据在兄弟元素中的index
 * @param {*} level  层级， 从 0 开始（数据的深度）
 * @param {*} levelIndex  索引顺序（例如0-2）
 * component_type: 1 是业务组件，需要遍历下级的uuid的组件
 */
export function setUuid(item, index, level, levelIndex, currentThemeStyle) {
  _changeOneItemThemeExtend(item, currentThemeStyle)
  _changeOneItemExtendProp(item)
  // 
  if (item.component_type === 0 || !item.component_type) {
    if (!item.props.uuid) {
      item.props.uuid = '' + levelIndex + '-' + index
    }
    if (!item.props.topUuid) {
      item.props.topUuid = '' + levelIndex
    }
  }
  
  if (item.component_type === '1') {
    if (!item.props.uuid) {
      item.props.uuid = '' + levelIndex + '-' + index
    }
    if (!item.props.topUuid) {
      item.props.topUuid = '' + levelIndex
    }

    if (item.props.children) {
      item.props.children.map((child, childIndex) => {
        setUuid(child, childIndex, level + 1, '' + levelIndex + '-' + childIndex, currentThemeStyle)
      })
      item.children = item.props.children
    }
  } else {
    // 否则还需要遍历 item.children 下的themeExtend数据
    if (item.children && item.children.length > 1) {
      updatePageItemThemeStyle(item.children, currentThemeStyle)
    }
  }


}

/**
 * 切换主题时候遍历更改全局
 * @param {*} data 
 * @param {*} currentThemeStyle 
 */
export function updatePageItemThemeStyle(data, currentThemeStyle) {
  data.forEach(item => {
    _changeOneItemThemeExtend(item, currentThemeStyle);

    if (item.children && item.children.length > 1) {
      updatePageItemThemeStyle(item.children, currentThemeStyle)
    }
  });
}

/**
 * 遍历数据对一个item进行的数据修改
 * @param {*} item 
 * @param {*} currentThemeStyle 
 */
export function _changeOneItemThemeExtend(item, currentThemeStyle) {
  if (item.themeExtend) {
    // 当前主题下的哪个配色 (主题style目前只有color， 但用于组件的字体色和背景色)
    const themeExtendStyleOne = item.themeExtend[currentThemeStyle.t_theme_id]
    if (themeExtendStyleOne) {
      if (!item.props.originStyles) item.props.originStyles = {}
      themeExtendStyleOne.forEach(styleItem => {
        const cssValue = currentThemeStyle.config[styleItem.key.toUpperCase()][styleItem.type];

        if (cssValue) {

          // 渐变和opacity todo 还有兼容性写法
          if (styleItem.opacity && (['background-color', 'color'].indexOf(styleItem.cssKey) !== -1)) {
            // filter:alpha(opacity=50);  //filter 过滤器   兼容IE678
            // item.props.originStyles['filter'] = `alpha(opacity=${cssValue * 100})`;
            item.props.originStyles[styleItem.cssKey] = `rgba(${hex2RGB(cssValue)},${styleItem.opacity})`
          } else if (styleItem.gradient) {

          } else {
            item.props.originStyles[styleItem.cssKey] = cssValue;
          }

        }

      })
    }
  }
}


export function _changeOneItemExtendProp(item) {
  if(!item.extendProps) {
    item.extendProps = {
      isCurrent: false, // 当前选中的
      isLocked: false,  // 当前元素是否锁定（move）,
      isFolded: false  //  tree 中默认展开
    };
  }
}

/** TODO
 * 工厂模式拼接model
 * @param {*} item 
 */
export function _changeOneItemModel(item) {

}



export function hex2RGB(color) {
  if (color.substr(0, 1) == "#") color = color.substring(1);
  if (color.length != 6) return alert("请输入正确的十六进制颜色码！");
  color = color.toLowerCase()
  var b = new Array();
  var x;
  for (x = 0; x < 3; x++) {
    b[0] = color.substr(x * 2, 2);
    b[1] = b[0].substr(0, 1);
    b[2] = b[0].substr(1, 1);
    b[3] = "0123456789abcdef";
    b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2])
  }
  return b[20] + "," + b[21] + "," + b[22];
}


// widget 相关
export function formatWidget(widgetList, componentGroupV2) {
  let formatWidget = [];
  const self = this;

  Object.keys(componentGroupV2).forEach((component_group, component_group_index)  => {
      formatWidget.push({
        title: componentGroupV2[component_group],
        component_group: component_group,
        widgetList: [],
        widgetKeyList: {}
      })

      for(let i = widgetList.length - 1; i >= 0 ; i--){
        const widgetItem = widgetList[i];
        // (格式化json)放入对应的组中,  并且 将 同一个com_id 的多个样式重新组装shows的键名中
        if(component_group === widgetItem.component_group) {
          _formatWidgetJSON(widgetItem);
          let currentKeyList = formatWidget[component_group_index].widgetKeyList
          if(!currentKeyList[widgetItem.com_id]) {
            currentKeyList[widgetItem.com_id] = []
          } 
          currentKeyList[widgetItem.com_id].push(widgetItem)

          // 将已经处理的从原widgetList 中移除， 加快遍历
          widgetList.splice(i, 1);
        }
      }

      _formatWidgetStyle(formatWidget, component_group_index)

    
  })

  return formatWidget;

}

export function _formatWidgetJSON(component) {
  let com_config;
  try {
    com_config = JSON.parse(component.com_config);
  } catch(e) {
    this.ctx.body = {
      code: -1,
      msg: e.message()
    }
  }
  com_config.com_id = component.com_id;

  // 除component_type 0 或不存在的 都需要注册字段
  if(!component.component_type || component.component_type === '0') {
    // 基本组件
    component.is_register = true;
  } else {
    // 通过umd安装后才能使用
    component.is_register = false;
  }

  // 'http://localhost:7002/public/components/LegoHeadMap.js'
  // component.fileUrl =  `http://localhost:7002/public/components/Lego${component.tag_name}.js`

  // component.fileUrl =  `/public/components/Lego${component.tag_name}.js`
  component.fileUrl =  `/public/components/headmap.js`
  component.component_umd_name = 'Lego' + component.tag_name;

  component.tag_name = 'lego-' + component.tag_name.toLowerCase();

  component.shows = [{
    com_desc: component.com_desc,
    com_img: component.com_img,
    tag_name: component.tag_name,
    style_id: component.component_style_id
  }]

  // ***** 前端部分才需要的extendProps ******
/*   component.extendProps = {
    isCurrent: false, // 当前选中的
    isLocked: false,  // 当前元素是否锁定（move）,
    isFolded: false  //  tree 中默认展开
  }; */
  
  delete component.com_config
  Object.keys(com_config).forEach(key => {
    if(!component[key]) {
      component[key] = com_config[key]
    }
  })
  // component = Object.assign({}, com_config, component)

}
/**
 *     
   shows:[ //从数据库拉取 
    [{
      com_desc:'主题一 样式一1',
      com_img:'http://lego.jyb.com/images/product3.png',
      tag_name:'lego-headmap',
    },{
      com_desc:'主题一 样式二2',
      com_img:'https://images.jyblife.com/lego/legoconfig/productlist/show.4.png',
      tag_name:'lego-headmap',
    }]
  ],
  将widgetKeyList 合并到 widgetList 
 * @param {*} component 
 */
export function _formatWidgetStyle(formatWidget, component_group_index) {
  let currentWidget = formatWidget[component_group_index];
  Object.keys(currentWidget.widgetKeyList).forEach(com_id => {
    if(currentWidget.widgetKeyList[com_id].length > 1) {
      let mergerWidget = {};
      currentWidget.widgetKeyList[com_id].forEach((styleItem, styleIndex) => {
        
        if (styleIndex > 0) {
          let currentShow = JSON.parse(JSON.stringify(styleItem.shows[0]));
          currentShow.com_config = styleItem
          mergerWidget.shows.push(currentShow)
        } else {
          mergerWidget = styleItem;
        }
      })
      currentWidget.widgetList.push(mergerWidget)
    } else {
      currentWidget.widgetList.push(currentWidget.widgetKeyList[com_id][0])
    }
  })

  delete formatWidget[component_group_index].widgetKeyList;
}

/**
 * 远程加载组件
 * @param {*} id 
 * @param {*} fileUrl 
 * @param {*} callback 
 */
export function loadComponents(fileUrl, callback) {
  // var scriptTag = document.getElementById(id);
  var oHead = document.getElementsByTagName("HEAD").item(0);
  var oScript = document.createElement("script");
  // if (scriptTag) oHead.removeChild(scriptTag);

  // oScript.id = id;

  oScript.type = "text/javascript";

  oScript.src = fileUrl;

  oHead.appendChild(oScript);

  oScript.onload = () => {
    callback && callback();
  };
}
