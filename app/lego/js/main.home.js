seajs.config({
	alias: {
		'jquery': 'jquery',
		'$': 'jquery',
		'mustache': 'mustache',
		'jquery.cookie': 'jquery.cookie',
		'vuefe': 'vuefe'

	},
	// map:[
	// 	['.js','.js?v=20171029']//映射规则
	// ]
});
define(function (require, exports, module) {
	var $ = require('jquery'),
		moduleMustache = require('mustache');
	require('jquery.cookie')($);
	require('vuefe');
	var moduleUtil,
		moduleDataCenter = require('./mpm.sys.dataCenter');
	
	require.async('./mpm.sys.util', function (module) {
		moduleUtil = module;
	});

	var curUserName = '';
	var loginOut = $('#loginout');

	function toCopy() {
		$("#js_mod_submit_btn").on("click", function (e) {
			var _path = $("#page_path").val().trim(),
				_pageId = $("#page_id").val().trim(),
				_author = moduleUtil.getCookie("jybactconfig"),
				reg = /^[0-9]*$/;
			if (!_path) {
				alert("新路径不可以为空！");
				return;
			}
			if (!reg.test(_pageId)) {
				alert("pageID必须为数字"); 
				return;
			}
			var all_path = _path;
			moduleDataCenter.checkPath(all_path, function (n) {
				if (n > 0) {
					alert('目录已存在');
				} else {
					moduleDataCenter.copyPage(_pageId, _path,_author, function (json) {
						if (!json) {
							alert("复制失败");
							return;
						}
						location.href = location.origin + "/" + 'edit.html?pageid=' + json;
					});
				}
			});


		});
	}

	function init() {
		toCopy();
		new Vue({
			el: '#pageTemplates',
			data: {
				list: []
			},
			created: function () {
				var vobj = this;
				vobj.getData();
			},
			methods: {
				getData: function () {
					var vobj = this;
					moduleDataCenter.getAllTemplates(function (json) {
						vobj.list = json.result;
					})
				},
				copyPage: function () {
					$("#copyPage").modal('show');
				}
			}
		});

		new Vue({
			el: '#notice',
			data: {
				notice: null,
			},
			created: function () {
				var vobj = this;
				vobj.getData();
			},
			methods: {
				getData: function () {
					var vobj = this;
					moduleDataCenter.getHomeNotice(function (json) {
						if (json && json.length) {
							vobj.notice = decodeURIComponent(json[0].content)
						}
					})
				}
			}
		});




	}

	exports.main = function () {
		// moduleUtil.ckeckIsLogin();
		loginOut.on("click" , function(){
			moduleUtil.setCookie("jybactconfig" , "" , -1);
			location.href = location.href;
		});
		init();
		seajs.use('./css/bootstrap-3.3.7/bootstrap.min', function (m) {
			$('[data-toggle="tooltip"]').tooltip();
		});
	}
});