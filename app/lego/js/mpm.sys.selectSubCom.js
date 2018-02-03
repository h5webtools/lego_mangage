define(function (require, exports, module) {
    var moduleUtil;
    var component;
    var callback;

    require.async('./mpm.sys.util', function (module) {
        moduleUtil = module;
    });


    //循环依赖，如果不setTimeout，会发现moduleUtil.getComponentList是未定义的
    setTimeout(function () {
        moduleUtil.getComponentList(function (list) {
            var grouparr = [];
            var des1 = { des: "外部注册", ishow: "block", val: [] },
                des2 = { des: "活动组件", ishow: "none", val: [] },
                des3 = { des: "通用组件", ishow: "none", val: [] };
            list.forEach(function (dom, index) {
                if (dom.component_group == 1) {
                    des1.val.push(dom);
                } else if (dom.component_group == 2) {
                    des2.val.push(dom);
                } else if (dom.component_group == 3) {
                    des3.val.push(dom);
                }
            });
            grouparr.push(des1);
            grouparr.push(des2);
            grouparr.push(des3);

            component = new Vue({
                el: '#popListBox',
                data: {
                    list: grouparr,
                    showFlag: false
                },
                methods: {
                    show: function () {

                    },
                    hide: function () {
                        this.showFlag = false;
                        if (typeof callback == "function") {
                            callback();
                        }
                    },
                    select: function (item) {
                        this.showFlag = false;
                        console.log(item);
                        if (typeof callback == "function") {
                            callback(item);
                        }
                    }
                }
            });
            window.__component = component;
        });
    });

    /**
     * paramFilter: arr，过滤掉某些组件
     * paramCB：选择子组件后，回掉
     */
    exports.show = function (paramFilter, paramCB) {
        callback = paramCB;
        component.showFlag = true;
        setTimeout(function () {
            // component.showFlag = false;
        });
    };
});