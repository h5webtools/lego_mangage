define(function(require, exports, module) {
  require('jquery.cookie')($);
  require('vuefe');
  var entrance = require("./mpm.sys.edit");
  Vue.config.debug = true;

  exports.main = function() {
    entrance.init();
  }
});
