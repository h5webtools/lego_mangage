import service from 'services';

//用户群列表
export function getUserGroup(data) {
  return service({
    url: '/act/getUserGroup',
    method: 'post',
    data:data
  });
}

//入口配置
export function getEntranceConf(data) {
  return service({
    url: '/act/getEntranceConf',
    method: 'post',
    data:data
  });
}

//拉取活动配置信息 
export function getActivityConfig(data) {
  return service({
    url: '/act/getActivityConfig',
    method: 'post',
    data:data
  });
}

//删除活动计划 
export function deleteEntrancePlan(data) {
  return service({
    url: '/act/deleteEntrancePlan',
    method: 'post',
    data:data
  });
}

//获取入口配置详情
export function getEntranceDetail(data) {
  return service({
    url: '/act/getEntranceDetail',
    method: 'post',
    data:data
  });
}

//修改候补计划
export function postEntrancePlan(data) {
  return service({
    url: '/act/postEntrancePlan',
    method: 'post',
    data:data
  });
}

//增加计划
export function putEntrancePlan(data) {
  return service({
    url: '/act/putEntrancePlan',
    method: 'post',
    data:data
  });
}

//新增候补计划
export function getEntrancePlanList(data) {
  return service({
    url: '/act/getEntrancePlanList',
    method: 'post',
    data:data
  });
}

//下架入口 
export function postEntranceShelves(data) {
  return service({
    url: '/act/postEntranceShelves',
    method: 'post',
    data:data
  });
}

// 获取icon列表
export function getIconEntranceDetail(data) {
  return service({
    url: '/act/getIconEntranceDetail',
    method: 'post',
    data:data
  });
}
