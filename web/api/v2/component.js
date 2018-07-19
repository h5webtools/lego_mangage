import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version



export function getLegoComponentList(data) {
  return service({
    url: routerPrefix + '/lego/getComponentList',
    method: 'post',
    data
  });
}

export function getLegoThemeStyle(data) {
  return service({
    url: routerPrefix + '/lego/getLegoThemeStyle',
    method: 'post',
    data
  });
}
