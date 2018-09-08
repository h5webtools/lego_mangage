import service from 'services';

/* 查询模板列表 */
export function queryGetComponentTemplate(data) {
  return service({
    url: 'act/getComponentTemplates',
    method: 'post',
    data: JSON.stringify(data)
  });
}

/* 保存模板信息 */
export function saveComponentTemplate(data) {
  return service({
    url: 'act/postComponentTemplate',
    method: 'post',
    data: JSON.stringify(data)
  });
}
/* 查询命令字 */
export function queryGetCmds(data) {
  return service({
    url: 'act/getCmds',
    method: 'post',
    data: JSON.stringify(data)
  });
}

/* 新建或者修改命令字 */
export function savePostCmd(data) {
  return service({
    url: 'act/postCmd',
    method: 'post',
    data: JSON.stringify(data)
  });
}
export function queryFilterList(data) {
  return service({
    url: 'act/getFilters',
    method: 'post',
    data
  });
}

export function saveParamConfig(data) {
  return service({
    url: 'act/postFilterParam',
    method: 'post',
    data
  });
}

/**
 * 删除参数
 * @param {*} id 
 */
export function deleteParamById(id) {
  return service({
    url: 'act/deleteFilterParam',
    method: 'post',
    data: {id}
  });
}

export function hideLogicItem(id) {
  return service({
    url: 'act/deleteFilterParam',
    method: 'post',
    data: JSON.stringify({
      id
    })
  });
}

export function modifyLogicItem(data) {
  return service({
    url: '/act/postFilter',
    method: 'post',
    data
  });
}
