var version='0.0.1';
seajs.config({
	alias: {
		'jquery': 'jquery',
		'$': 'jquery',
		'mustache': 'mustache',
		'jquery.cookie': 'jquery.cookie',
		'vuefe': 'vuefe'
	},
	// map:[
	// 	['.js','.js?v='+version],//映射规则
	// 	['mpm.sys.edit.dev.js','mpm.sys.edit.dev.js']
	// ]
});

define(function(require, exports, module) {
	console.log("dev entrance 1");
	require('jquery.cookie')($);
	require('vuefe');
    // var vue 	 = require("vuefe");
    // var $   	 = require("zepto");
    var entrance = require("./mpm.sys.edit");
    Vue.config.debug = true;



	exports.main = function() {
		
		console.log("dev entrance");
		entrance.init();
		
	}
});