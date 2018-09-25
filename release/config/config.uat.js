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

  config.jmfCommonParam = {
    "env": "prod",
    "set": "gz_jyb_idc", //使用URL中的set值
    "group": "*", //使用URL中的group值
    "version": "1.0.0", //使用URL中的version值
    "method": "invoke"
  }

  config.mysql = {
    clients: {
      dbMain: {
        host: '10.23.143.124',
        port: 3306,
        user: 'jybread',
        password: 'Pub@read$sh18;;',
        database: "db_jyb"
      },
      dbLego: {
        host: '10.23.9.235',
        port: 3306,
        user: 'jyb',
        password: 'YHNBGT',
        database: "db_act_config"
      }
    },
    app: true
  }

  config.actLegoConfig = {
    GetActivityDraftConfig: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetActivityDraftConfig'
    }],
    GetEvent: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetEvent'
    }],
    AddOrUpdateEvent: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.AddOrUpdateEvent'
    }],
    GetActEvent: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetActEvent'
    }]
  }
  config.actEntryConfig = {
    userGroupList: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.QueryUserGroupList'
    }],
    entranceConf: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntranceConf'
    }],
    activityConfig: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetActivityConfig'
    }],
    deleteEntrancePlan: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.DeleteEntrancePlan'
    }], 
    getEntranceDetail: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntranceDetail'
    }],
    postEntrancePlan: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.PostEntrancePlan'
    }],
    putEntrancePlan: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.PutEntrancePlan'
      
    }],
    getEntrancePlanList: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetEntrancePlanList'
    }],
    postEntranceShelves: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.PostEntranceShelves'
    }],
    getIconEntranceDetail: [{
      ip: 'http://10.23.50.153:12066',
      jmf: 'com.jyblife.complex.h5.act_console.GetIconEntranceDetail'
    }]
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '10.23.175.247',   // Redis host
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
    previewTem: 'confirm_publish.tjs',
    actJs: 'index.js',
    minifyJs: true,
    branchName: 'lego_prod'
  }

  config.envConfig = {
    BASE_API: 'http://manage.jyblife.com',
    RELEASE_PATH: 'http://release.jyblife.com/task/interface',
    CDN_PREFIX: 'https://cdn.jyblife.com/act/',
    previewHost:'https://lego.jyblife.com'
  }

  config.userRole = {
    admin: [46, 81],
    operator: [74, 82, 57, 50],
    tester: [95, 87, 69],
    dev: [86],
    operatorAdmin: [122]
  }

  config.passportJyb = {
    'menu_code': 'lego_manage',
    'client_id': 'lego_manage',        
    'secret_key': 'fc0b088d18053c320a1733c2b8021e21',      
  };

  config.guideLogin = {
    'client_id': 'lego_manage',        
    'secret_key': 'fc0b088d18053c320a1733c2b8021e21',      
  };
  return config;
};