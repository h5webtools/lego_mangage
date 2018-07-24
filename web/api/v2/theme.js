import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version

export function getLegoThemeStyle(data) {
  return service({
    url: routerPrefix + '/getLegoThemeStyle',
    method: 'post',
    data
  });
}
