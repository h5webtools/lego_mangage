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
        database: "db_h5_act_config"
      }
    },
    app: true
  }

  config.actEntryConfig = {
    entryList: [{
      ip: '',
      jmf: ''
    },{
      ip: '',
      jmf: ''
    }],
    auditList: [{
      ip: '',
      jmf: ''
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
    path: '/data/www/lego',
    templateJs: 'index_dev.tjs',
    actJs: 'index.js',
    minifyJs: false,
    branchName: 'lego_dev'
  }

  config.envConfig = {
    BASE_API: 'http://172.16.1.8:9014/hanyi/manage',
    RELEASE_PATH: 'http://r.jtjr.com/task/interface',
    LEGO_BASE_API: 'http://172.16.1.10:3001'
  }

  return config;
};
