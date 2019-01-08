'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// MYSQL数据库
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.passportJyb = {
  enable: true,
  package: '@node/egg-passport-jyb'
};
exports.guideLogin = {
  enable: true,
  package: '@node/egg-guide-login',
};