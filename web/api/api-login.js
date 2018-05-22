import service from 'services';

export function doLogin(username, password) {
  return service({
    url: '/login/doLogin',
    method: 'post',
    data: {
      username,
      password
    }
  });
}