import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version

export function getLegoPackage(data) {
  return service({
    url: routerPrefix + '/legoPackage',
    method: 'post',
    data
  });
}

export function publishSit(data) {
  return service({
    url: routerPrefix + '/publishSit',
    method: 'post',
    data
  });
}
