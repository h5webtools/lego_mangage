'use strict';

let path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // log目录配置
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  config.development = {
    ignoreDirs: ['web'],
    watchDirs: ['public']
  }

  config.static = {
    dir: [path.join(appInfo.baseDir, 'app/public'), path.join(appInfo.baseDir, 'app/lego')]
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
    path: '/data/www/lego/h5_lego_actpage/release/act/',
    templateJs: 'index_dev.tjs',
    actJs: 'index.js',
    minifyJs: false,
    branchName: 'lego_dev'
  }

  config.envConfig = {
    BASE_API: 'http://172.16.1.8:9014/hanyi/manage',
    RELEASE_PATH: 'http://r.jtjr.com/task/interface',
    CDN_PREFIX: 'https://cdnsit.jyblife.com/act/'
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
    'secret_key': 'aa12b55645fb110f403efbf6bff23186',      
  };
  
  return config;
};
