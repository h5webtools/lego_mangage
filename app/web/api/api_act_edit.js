import service from 'services';


export function getTestEngineer() {
  return service({
    url: '/common/getTestEngineer',
    method: 'post'
  });
}

export function getActDetail(data) {
  return service({
    url: '/act/getActDetail',
    method: 'post',
    data
  });
}

export function postSingleConf(data) {
    return service({
        url: '/act/postSingleConf',
        method: 'post',
        data
    })
}

export function saveActConfig(data) {
  return service({
    url: '/act/postAct',
    method: 'post',
    data
  });
}

export function getRelatedCouponList() {
  return service({
    url: '/common/coupons',
    method: 'post'
  });
}

export function getEnableEditUsersList() {
  return service({
    url: '/common/users',
    method: 'post'
  });
}

export function getChannelList() {
  return service({
    url: '/act/GetChannels',
    method: 'post'
  });
}

export function getSingleFile(search, page, pageSize) {
    return service({
        url: '/act/GetSingles',
        method: 'post',
        data: {
            search: search,
            page: page || 1,
            page_size: pageSize || 1000
        }
    });
}

export function getSingleFileParams(code) {
    return service({
        url: '/act/GetSingleParams',
        method: 'post',
        data: {
            code: code
        }
    });
}

export function putSingleFile(data) {
    return service({
        url: '/act/PutSingles',
        method: 'post',
        data: data
    });
}

export function putSingleParams(data) {
    return service({
        url: '/act/PutSingleParams',
        method: 'post',
        data: data
    });
}

export function getActSingleConfig(act_id, is_draft) {
    return service({
        url: '/act/GetActSingleConfig',
        method: 'post',
        data: {
            act_id,
            is_draft: is_draft || 0
        }
    });
}

export function setChannelList(data) {
  return service({
    url: '/act/PostChannel',
    method: 'post',
    data
  });
}
export function GetActivityDraftConfig(data) {
  return service({
    url: '/act/GetActivityDraftConfig',
    method: 'post',
    data:data
  });
}
