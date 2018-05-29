import service from 'services';

export function getActPages(data) {
  return service({
    url: '/lego/getActPageList',
    method: 'post',
    data
  });
}

export function getLegoComponentList(data) {
  return service({
    url: '/lego/getComponentList',
    method: 'post',
    data
  });
}

export function getLegoThemeColor(data) {
  return service({
    url: '/lego/getLegoThemeColor',
    method: 'post',
    data
  });
}
