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

export function setChannelList(data) {
  return service({
    url: '/act/PostChannel',
    method: 'post',
    data
  });
}