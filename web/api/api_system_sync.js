import service from 'services';

/* 查询命令字 */
export function getSyncList(data) {
  return service({
    url: '/ActivitySynConf/index',
    method: 'post',
    data
  });
}

/* 新建或者编辑配置 */
export function savePostSync(data) {
  return service({
    url: '/ActivitySynConf/store',
    method: 'post',
    data
  });
}

/* 立即同步 */
export function tblSync(data) {
  return service({
    url: '/ActivitySynConf/TblSyn',
    method: 'post',
    data
  });
}