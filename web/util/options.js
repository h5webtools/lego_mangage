/**
 * select options定义
 */

import { WIDGET_TYPE, CODE_STATUS } from '@/util/enum';

// 组件类型
export const widgetType = [
  {
    label: '私有组件',
    value: WIDGET_TYPE.PRIVATE
  },
  {
    label: '平台组件',
    value: WIDGET_TYPE.PUBLIC
  }
];

// 组件代码状态
export const codeStatus = [
  {
    label: '调试',
    value: CODE_STATUS.DEBUG
  },
  {
    label: '发布',
    value: CODE_STATUS.PUBLISH
  }
];

export function getLabelByValue(options) {
  const map = options.reduce((obj, item) => {
    obj[item.value] = item.label;
    return obj;
  }, {});

  return value => map[value] || '';
}
