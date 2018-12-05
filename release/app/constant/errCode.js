const errCode = {
  LOGIN_FAILED: {
    code: 130011,
    msg: '登录失败'
  },
  LOGIN_INVALID_PARAM: {
    code: 130012,
    msg: '用户名或密码错误'
  },
  LOGIN_SUCCESS: {
    code: 0
  },
  ROLE_FAILED: {
    code: 130013,
    msg: '获取用户角色失败'
  },
  NOT_LOGIN: {
    code: 130010,
    msg: '用户未登录'
  },
  ALL_TARGET_ENV_DISCONNECTED: {
    code: 150010,
    msg: '服务器无法接通'
  },
  GETDATA_FAILED: {
    code: 150011,
    msg: '系统繁忙，请稍后重试'
  },
  INVALID_PARAM_FORMAT: {
    code: 140010,
    msg: '参数格式错误'
  },
  EMPTY_PARAMS: {
    code: 140011,
    msg: '所需参数为空'
  },
  GET_USER_LIST_FAILED: 110012,
  GET_USER_INFO_FAILED: 110010,
  GET_DATA_FAILDED: 210010,
  WRITE_FILE_FAILED: 310010,
  ACTION_SUCCESS: 1,
  ACTION_FAILED: 0
}

module.exports = errCode;