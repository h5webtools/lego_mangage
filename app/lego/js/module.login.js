seajs.config({
	alias: {
		'jquery': 'jquery',
		'$': 'jquery',
		'mustache': 'mustache',
		'jquery.cookie': 'jquery.cookie',
		'vuefe': 'vuefe'

	}
	// ,
	// map:[
	// 	['.js','.js?v=20171029']//映射规则
	// ]
});
define(function (require, exports, module) {
	var $ = require('jquery'),
		moduleMustache = require('mustache');
	require('jquery.cookie')($);
	require('vuefe');
	var moduleUtil = require('./mpm.sys.util'),
		moduleDataCenter = require('./mpm.sys.dataCenter');
	var curUserName = '';

	function init() {
		new Vue({
			el: '#login',
			data: {
				username:"",
				userpwd:""
			},
			created: function () {
				
			},
			methods: {
				toLogin:function(e){
					console.log("to login");
					if(!this.username || !this.userpwd){
						alert("用户名和密码不能为空！");
					}
					moduleUtil.checkLogin(this.username.trim(), this.userpwd.trim());
				}
			}
		});
	}

	exports.main = function () {
		init();
	}
});