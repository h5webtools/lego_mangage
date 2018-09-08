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

/*

      let postData = {
        npmName:'@lego/lego_component_basic',
        folder: this.pageConfigForm.dateFolder + '/' + this.pageConfigForm.pageMenu // 
      };
*/
export function getPackageVersions(data) {
  return service({
    url: routerPrefix + '/getPackageVersions',
    method: 'post',
    data
  });
}


/*
let postData = {
    npmName:'@lego/lego_component_basic',
    npmVersion:'0.0.13-beta',
    folder: this.pageConfigForm.dateFolder + '/' + this.pageConfigForm.pageMenu // 
  };
*/
export function updatePackageVersion(data) {
  return service({
    url: routerPrefix + '/updatePackageVersion',
    method: 'post',
    data
  });
}


