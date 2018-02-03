import service from 'services';

/* 乐高规则树 */
export function getLegoChains(data) {
  return service({
    url: '/act/GetLegoChains',
    method: 'post',
    data: JSON.stringify(data)
  });
}
/* 乐高规则树 */

/* 乐高规则树数据 */
export function SaveChainsByComponentTemplate(data) {
  return service({
    url: '/act/SaveChainsByComponentTemplate',
    method: 'post',
    data: JSON.stringify(data)
  });
}
/* 乐高规则树数据 */



/* 保存规则树 */
export function saveComponentTemplateChains(data) {
  return service({
    url: '/act/postComponentTemplateChains',
    method: 'post',
    data: JSON.stringify(data)
  });
}
/* 保存规则树 */

/* 获取规则树 */
export function getComponentTemplateChains(data) {
  return service({
    url: '/act/getComponentTemplateChains',
    method: 'post',
    data: JSON.stringify(data)
  });
}
/* 获取规则树 */



export function getCmdList(data) {
  return service({
    url: '/act/getCmds',
    method: 'post',
    data: JSON.stringify(data)
  });
}

export function getRuleActionList() {
  return service({
    url: '/act/getRulesAndActions',
    method: 'post'
  });
}

export function getChainTree(act_id) {
  return service({
    url: '/act/GetChains',
    method: 'post',
    data: JSON.stringify({
      act_id
    })
  });
}

export function getActTrees(data) {
  return service({
    url: '/act/GetActTrees',
    method: 'post',
    data: JSON.stringify(data)
  });
}



export function saveCmdChains(data) {
  return service({
    url: '/act/saveCmdChains',
    method: 'post',
    data: JSON.stringify(data)
  });
}