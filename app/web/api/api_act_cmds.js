import service from 'services';

/* 查询命令字 */
export function queryGetCmds(data) {
  return service({
    url: 'act/getCmds',
    method: 'post',
    data
  });
}

/* 新建或者修改命令字 */
export function savePostCmd(data) {
  return service({
    url: 'act/postCmd',
    method: 'post',
    data
  });
}
