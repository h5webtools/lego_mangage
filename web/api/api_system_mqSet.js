import service from 'services';

/* MQ事件列表 */
export function GetEvent(data) {
  return service({
    url: '/act/GetEvent',
    method: 'post',
    data:data
  });
}
/* MQ事件添加、编辑 */
export function AddOrUpdateEvent(data) {
  return service({
    url: '/act/AddOrUpdateEvent',
    method: 'post',
    data:data
  });
}
/* 活动MQ事件管理 */
export function GetActEvent(data) {
  return service({
    url: '/act/GetActEvent',
    method: 'post',
    data:data
  });
}

