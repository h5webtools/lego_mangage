/**
 * helper
 */

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
 * 根据索引位置修改数据
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
 * 直接设置某个item的key
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
 * 遍历修改这个值中的uuid属性 并整合 业务组件中prop到children
 * @param {*} item 
 * @param {*} index  当前数据在兄弟元素中的index
 * @param {*} level  层级， 从 0 开始（数据的深度）
 * @param {*} levelIndex  索引顺序（例如0-2）
 * component_type: 1 是业务组件，需要遍历下级的uuid的组件
 */
export function setUuid(item, index, level, levelIndex, sbilingItem, currentThemeStyle) {
  changeOneItemThemeExtend(item, currentThemeStyle)
  // 
  if (item.component_type === 0 || !item.component_type) {
    if (!item.props.uuid) {
      item.props.uuid = '' + levelIndex + '-' + index
    }
    if (!item.props.topUuid) {
      item.props.topUuid = '' + levelIndex
    }
  }
  if (item.component_type === 1) {
    if (!item.props.data.uuid) {
      item.props.data.uuid = '' + levelIndex + '-' + index
    }
    if (!item.props.data.topUuid) {
      item.props.data.topUuid = '' + levelIndex
    }

    if (item.props.data.children) {
      item.props.data.children((child, childIndex) => {
        setUuid(child, childIndex, level + 1, '' + levelIndex + '-' + childIndex, item.props.data.children)
      })
      item.children = item.props.data.children
    }

  }
}

/**
 * 切换主题时候遍历更改全局
 * @param {} data 
 * @param {*} currentThemeStyle 
 */
export function updatePageItemThemeStyle(data, currentThemeStyle) {
  data.forEach(item => {
    changeOneItemThemeExtend(item, currentThemeStyle);

    if (item.children && item.children.length > 1) {
      updatePageItemThemeStyle(item.children, currentTheme)
    }
  });
}

export function changeOneItemThemeExtend(item, currentThemeStyle) {
  debugger
  if (item.themeExtend) {
    // 当前主题下的哪个配色 (主题style目前只有color， 但用于组件的字体色和背景色)
    const themeExtendStyleOne = item.themeExtend[currentThemeStyle.t_theme_id]
    if (themeExtendStyleOne) {
      if (!item.props.originStyles) item.props.originStyles = {}
      themeExtendStyleOne.forEach(styleItem => {
        const cssValue = currentThemeStyle.config[styleItem.key][styleItem.type];

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