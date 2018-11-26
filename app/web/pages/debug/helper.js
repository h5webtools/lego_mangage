
/**
 * 获取对象的属性
 * @param {Object} obj
 * @param {Array} variable
 * @param {Object} options
 * @param {Number} options.limit
 * @param {String} options.prefix
 */
export function getObjectFunction(obj, variable = [], options = {}) {
  const limit = options.limit || 4;
  const prefix = options.prefix || 'LegoUtil';
  const prefixLen = prefix.split('.').length;

  if (prefixLen >= limit) return;
  for (const k in obj) {
    if (typeof obj[k] === 'function' || prefixLen === limit - 1) {
      variable.push({
        key: `${prefix}.${k}`,
        type: (obj[k] && obj[k].type) || (typeof obj[k]),
        label: (obj[k] && obj[k].label) || ''
      });
    } else if (typeof obj[k] === 'object') {
      getObjectFunction(obj[k], variable, { prefix: `${prefix}.${k}` });
    }
  }
}

/**
 * 类型处理函数
 * @param {String} type
 */
export function getProcessFunc(type) {
  const processVariable = {
    function: {
      getKey(val) {
        return val.key;
      },
      getValue(val) {
        return `${val.key}()`;
      },
      getLabel(val) {
        return val.key;
      }
    },
    default: {
      getKey(val) {
        return val.key;
      },
      getValue(val) {
        return val.key;
      },
      getLabel(val) {
        return val.key;
      }
    }
  };
  return processVariable[type] || processVariable.default || {};
}

/**
 * 获取组件属性
 * @param {Object} config
 * @return {Array}
 */
export function getComponentProps(config) {
  const result = [];
  const PROPS = [
    'styleKey',
    'didTrigger',
    'didFinish',
    'lazyLoad',
    'isShowNpmVersions',
    'npmversion',
    'npmversionArr',
    'npmname',
    'extend',
    'fnObj',
    '_itemList'
  ];

  if (!config.data) return result;
  for (const k in config.data) {
    if (PROPS.indexOf(k) === -1) {
      result.push({
        name: config.name,
        propName: k,
        type: (typeof config.data[k])
      });
    }
  }
  return result;
}
