/**
 * querystring
 */

import * as util from '@jyb/lib-util';

// 页面ID
export const pageId = util.getQuery('_page_id') || '';

// 代码ID
export const codeId = util.getQuery('_code_id') || '';

// 组件ID
export const widgetId = util.getQuery('_widget_id') || '';

// 编辑器模式
export const mode = util.getQuery('_mode') || '';
