import service from 'services';

import {version} from './const.js'
const routerPrefix = '/' + version

export function savePage(data) {
  return service({
    url: routerPrefix + '/legoEdit/savePage',
    method: 'post',
    data
  });
}


export function getPage(data) {
  return service({
    url: routerPrefix + '/legoEdit/getPage',
    method: 'post',
    data
  });
}




export function savePageBasicInfo(data) {
  return service({
    url: routerPrefix + '/legoEdit/savePageBasicInfo',
    method: 'post',
    data
  });
}



