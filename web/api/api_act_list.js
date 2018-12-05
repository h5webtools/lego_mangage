import service from 'services';

export function getActList(data) {
  return service({
    url: '/act/getActs',
    method: 'post',
    data
  });
}
export function updateActStatus(data) {
  return service({
    url: '/act/UpdateActStatus',
    method: 'post',
    data
  });
}
export function getOptLogs(data) {
  return service({
      url: '/common/GetOptLogs',
      method: 'post',
      data
    });
}
//手动触发同步
export function manual(data) {
  return service({
      url: '/ActivitySynConf/manual',
      method: 'post',
      data
    });
}
//手动触发同步
export function getShowList(data) {
  return service({
      url: '/ActShowParam/do',
      method: 'post',
      data
    });
}