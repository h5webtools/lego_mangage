'use strict';

let path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // log目录配置
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  config.static = {
    dir: [path.join(appInfo.baseDir, 'public'), path.join(appInfo.baseDir, 'legoV2') ]
  }

  config.mysql = {
    clients: {
      dbMain: {
        host: '172.16.1.13',
        port: '3306',
        user: 'jiayoubao',
        password: 'root1234',
        database: "db_jyb_test"
      },
      dbLego: {
        host: '172.16.1.13',
        port: '3306',
        user: 'jiayoubao',
        password: 'root1234',
        database: "db_h5_act_config",
        dateStrings:true
      }
    },
    app: true
  }

  config.jmfCommonParam = {
    "env": "prod",
    "set": "gz_jyb_idc", //使用URL中的set值
    "group": "*", //使用URL中的group值
    "version": "1.0.0", //使用URL中的version值
    "method": "invoke"
  }
  //乐高微服务
  config.actLegoConfig = {
    GetActivityDraftConfig: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetActivityDraftConfig'
    }]
  }
  config.actEntryConfig = {
    userGroupList: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.QueryUserGroupList'
    }],
    entranceConf: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntranceConf'
    }],
    activityConfig: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetActivityConfig'
    }],
    deleteEntrancePlan: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.DeleteEntrancePlan'
    }], 
    getEntranceDetail: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntranceDetail'
    }],
    postEntrancePlan: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.PostEntrancePlan'
    }],
    putEntrancePlan: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.PutEntrancePlan'
    }],
    getEntrancePlanList: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntrancePlanList'
    }],
    postEntranceShelves: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.PostEntranceShelves'
    }],
    getIconEntranceDetail: [{
      ip: 'http://172.16.1.35:12053',
      jmf: 'com.jyblife.complex.h5.act_console.GetIconEntranceDetail'
    }]
  }
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '172.16.1.16',   // Redis host
      password: '',
      db: 0,
    },
    agent:true
  }

  config.npmConfig = {
    host: 'http://npm.jyblife.com'
  }

  config.legoConfig = {
    // path: '/data/www/lego/h5_lego_actpage/release/act/',
    path: '/Users/zhaoshali/work/www/lego/build_static',
    templateJs: 'index_dev.tjs',
    previewTem: 'confirm_publish.tjs',
    actJs: 'index.js',
    minifyJs: false,
    branchName: 'lego_dev'
  }

  config.envConfig = {
    BASE_API: 'http://172.16.1.8:9014/hanyi/manage',
    RELEASE_PATH: 'http://r.jtjr.com/task/interface',
    CDN_PREFIX: 'https://cdnsit.jyblife.com/act/',
    previewHost:'http://127.0.0.1:7001'
  }

  config.userRole = {
    admin: [46],
    operator: [84, 50],
    tester: [85],
    dev: []
  }

  config.passportJyb = {
    'menu_code': 'lego_manage',
    'client_id': 'lego_manage',        
    'secret_key': 'fc0b088d18053c320a1733c2b8021e21',      
  };
  
  config.viewJyb = { // 默认配置，可以自己设置覆盖
    devServer: {
      enable: false, // 是否开启构建服务
      command: 'jfet build -w', // 执行命令
      env: {}, // 环境变量
      timeout: 60 * 1000, // 启动超时时间ß
      port: 35729, // livereload端口
      watchPath: path.join(appInfo.baseDir, './public/**/*'), // 监听目录，必须为绝对路径
    },
    viewStateKey: '__VIEW_STATE__', // view状态名称，会挂载在window下
    manifest: path.join(appInfo.baseDir, 'public/manifest.json') // manifest.json路径，必须为绝对路径
  };

  return config;
};
