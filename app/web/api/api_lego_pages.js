import service from 'services';

export function getActPages(data) {
  return service({
    url: '/lego/getActPageList',
    method: 'post',
    data
  });
}