'use strict';

let path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_lego_';

  // session配置，服务端保存在redis中
  config.session = {
    key: 'LEGO_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  config.bodyParser = {
    enable:true,
    encoding:'utf8',
    formLimit:'5mb',
    jsonLimit:'5mb',
    strict:true,
    queryString:{
      arrayLimit:100,
      depth:5,
      parameterLimit:1000
    }
  }

  config.security = {
    csrf: {
      useSession: true,
      headerName: 'x-csrf-token',
      enable: false
    }
  }

  // 视图
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.nj': 'nunjucks',
    },
    noCache: true,
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };

  // add your config here
  // config.middleware = ['requestParam', 'userAuth'];
  config.middleware = ['requestParam','errorHandler'];

  config.passportJyb = {
    clients: {
      mysqlOperate: {
        'userDBClient': 'dbMain'
     }
    },
    'selfSystem': {  
      'noAuth': [/\/login\/doLogin/, /^\/lego\/syncCallback/,  /^\/lego\/previewLock/],
      'hook': {
        async logoutCallbackbefore(ctx) {
          const {path} = ctx.request;
          const rules = [/^\/$/, /\/login/, /\/login\/loginOut/, /^\/v2$/, /^\/v2\/legoEdit$/]
          
          const state = rules.find(rule => {
            if(rule.test(path)) {
              return true;
            }
          })

          if(!state) {
            ctx.body = {
              code: '1601000014',
              msg: '用户未登录'
            }
            return true;

          } else {
            return false;
          }

        }
      }
    }
  }

  config.viewJyb = { // 默认配置，可以自己设置覆盖
    devServer: {
      enable: false, // 是否开启构建服务
      command: 'jfet build -w', // 执行命令
      env: {}, // 环境变量
      timeout: 60 * 1000, // 启动超时时间
      port: 35729, // livereload端口
      watchPath: path.join(appInfo.baseDir, './public/**/*'), // 监听目录，必须为绝对路径
    },
    viewStateKey: '__VIEW_STATE__', // view状态名称，会挂载在window下
    manifest: path.join(appInfo.baseDir, 'public/manifest.json') // manifest.json路径，必须为绝对路径
  }

  return config;
};
