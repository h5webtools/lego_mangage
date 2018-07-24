import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version

export function getWidgetList(data) {
  return service({
    url: routerPrefix + '/getWidgetList',
    method: 'post',
    data
  });
}
