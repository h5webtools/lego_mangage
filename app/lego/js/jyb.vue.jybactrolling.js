define(function (require, exports, module) {

    var _cacheThisModule_ = '';
    var envetsControl;

    function _register(opt) {
        var comConfig = {
            props: ["params"],
            data: function () {
                return {
                    data: {
                        didTrigger: false,
                        didFinish: false,
                        tabIndex: 0,
                        itemList:""
                    }
                };
            },
            created: function () {
                !this.params.lazyLoad && this.loadData();
            },
            methods: {
                loadData: function () {
                    var me = this;
                    if(this.data.didFinish) return; //已经加载完成了
                    
                    var json = ['赵**购买19000元60天理财 ' , ' 赵**购买30000元180天理财 ' , ' 赵**购买9000元360天理财 ' , ' 赵**购买10000元720天理财 '];
                    this.data.itemList = json.join("    ");
                    this.data.didTrigger = true;
                    this.data.didFinish = true;
                    this.$nextTick(function () {
                       
                    });
                }
            }
        };

        if (opt.template) {
            comConfig.template = opt.template;
        }

        Vue.component(opt.tagName, comConfig);

    }


    exports.register = function (opts) {
        var settings = {
            template: null,
            tagName: "jybactrolling"
        };
        _register(settings);
    }

});

