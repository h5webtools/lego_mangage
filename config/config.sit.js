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
        host: '10.4.33.63',
        port: '3306',
        user: 'jybsit',
        password: 'SITYHNBGT',
        database: "db_jyb"
      },
      dbLego: {
        host: '10.4.33.63',
        port: '3306',
        user: 'jybsit',
        password: 'SITYHNBGT',
        database: "db_act_config"
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
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.QueryUserGroupList'
    }],
    entranceConf: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.GetEntranceConf'
    }],
    activityConfig: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.GetActivityConfig'
    }],
    deleteEntrancePlan: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.DeleteEntrancePlan'
    }], 
    getEntranceDetail: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.GetEntranceDetail'
    }],
    postEntrancePlan: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.PostEntrancePlan'
    }],
    putEntrancePlan: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.PutEntrancePlan'
    }],
    getEntrancePlanList: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.GetEntrancePlanList'
    }],
    postEntranceShelves: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.PostEntranceShelves'
    }],
    getIconEntranceDetail: [{
      ip: 'http://10.4.45.71:12056',
      jmf: 'com.jyblife.complex.h5.act_manager.GetIconEntranceDetail'
    }]
  }

  config.sysConfig = {
    sync: [{
      ip: '',
      jmf: ''
    }]
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '10.4.33.63',   // Redis host
      password: '',
      db: 0
    },
    agent:true
  }

  config.npmConfig = {
    host: 'http://npm.jyblife.com'
  }

  config.legoConfig = {
    path: '/data/www/lego/h5_lego_actpage/release/act/',
    templateJs: 'index.tjs',
    actJs: 'index.js',
    minifyJs: true,
    branchName: 'lego_sit'
  }

  config.envConfig = {
    BASE_API: 'http://manage.sit.jyblife.com',
    RELEASE_PATH: 'http://release.jyblife.com/task/interface'
  }

  return config;
};
