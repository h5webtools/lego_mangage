
import { hasOwnProp } from '@/assets/js/util';

export function getObjectFunction(obj, variable = [], options = {}) {
  const limit = options.limit || 4;
  const prefix = options.prefix || 'LegoUtil';
  const prefixLen = prefix.split('.').length;

  if (prefixLen >= limit) return;
  for (const k in obj) {
    if (hasOwnProp(obj, k)) {
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
}

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
    prop: {
      getKey(val) {
        return val.key.split('.').slice(-2).join('.');
      },
      getValue(val) {
        return val.key.split('.').pop();
      },
      getLabel(val) {
        return val.label || val.key;
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
