import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version

export function getActPages(data) {
  return service({
    url: routerPrefix + '/lego/getActPageList',
    method: 'post',
    data
  });
}

export function getLegoComponentList(data) {
  return service({
    url: routerPrefix + '/lego/getComponentList',
    method: 'post',
    data
  });
}

export function getLegoThemeColor(data) {
  return service({
    url: routerPrefix + '/lego/getLegoThemeColor',
    method: 'post',
    data
  });
}
