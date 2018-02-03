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
                        timeFlag: false,
                        exchangeFlag:false,
                        buycount:0
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
                    me.data.timeFlag =  new Date() >= new Date(me.params.exchagetime);
                    /*
                    0:不可领取
                    1:已领取
                    2:可领取
                    */
                    var json = {
                        "code": "0",
                        "data": {
                            "1": {
                                score:10000000,
                                left_times:1,
                                status: {
                                    "1": "0",
                                    "2": "0",
                                    "3": "0",
                                    "4": "0",
                                    "5": "0",
                                    "6": "0",
                                    "7": "0",
                                    "8": "0",
                                    "9": "0",
                                    "10": "0",
                                    "11": "0",
                                    "12": "0",
                                    "13": "0",
                                    "14": "0",
                                    "15": "0",
                                    "16": "0",
                                    "17": "0",
                                    "18": "0",
                                    "19": "0",
                                    "20": "0"
                                }
                            }
                        }
                    }
                    //先判断是否已兑换
                    //window.pageConfig.TABEXCHANGESCORE = [2000000 , 10000];
                    var statusObj = json.data[1].status;
                    me.data.buycount = json.data[1].score/100;
                    me.params.exchangeItem.forEach(function(item , index){
                      //if(item.exchangelevel < window.pageConfig.TABEXCHANGESCORE[0]/100){//未满额
                        //item.awardFlag =  2;
                      //}else{
                      item.awardFlag = statusObj[index*1+1];
                      //}
                      //if(item.awardFlag != 0){
                        //me.exchangeFlag = true;
                      //}
                    });
                    me.data.exchangeFlag = json.data.left_times!=0;
                    //判断是否有资格兑换

                    this.data.didTrigger = true;
                    this.data.didFinish = true;
                    this.$nextTick(function () {
                        
                    });
                },
                toexchange:function(){
                    
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
            tagName: "jybexchange"
        };
        _register(settings);
    }

});

