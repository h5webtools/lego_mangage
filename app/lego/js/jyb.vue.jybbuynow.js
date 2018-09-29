define(function (require, exports, module) {

    //var util = require('@lego/util');
    var util = {
        getQuery : function (name, url) {
            var u = url || window.location.search,
              reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
              r = u.substr(u.indexOf("\?") + 1).match(reg);
            return r != null ? r[2] : "";
        },
        getCookie: function (name) {
            //读取COOKIE
            var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
            return val ? (val[2] ? unescape(val[2]) : "") : null;
        },
        timeFormat: function (fmt, time) {
            var o = {
                "M+": time.getMonth() + 1, //月份 
                "d+": time.getDate(), //日 
                "h+": time.getHours(), //小时 
                "m+": time.getMinutes(), //分 
                "s+": time.getSeconds(), //秒 
                "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
                "S": time.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }

    function _register(opt) {

        Vue.component("jybbuynow", {
            props: ["params"],
            // template: '#' + config.uid + "_tpl",
            /* data: function() {
                 return {
                     data: {}
                 };
             },*/
            functional: false,
            //mixins: [commonFunc.commonUtil.utilMethods],
            data: function () {
                return {
                    data: {
                        didFinish: false,
                        didTrigger: false,
                        showMore: false,
                        itemList:[],
                        isShow:true,
                        nowBuyItem:{bgcolor:''},
                        times: {
                            miniSec: "02",
                            sec: "02",
                            minute: "02",
                            hour: "00",
                            day: "02"
                        }
                    }
                };
            },
            mounted: function() {
                $('.ui-p-fixed').removeClass('ui-p-fixed');
            },
            created: function () {
                this.initData();
            },
            methods: {
                formatTime:function(day , hour){
                    var hour = day * 24 + hour * 1,
                        strHour = hour > 10 ? hour : ('0'+hour);
                    return strHour;
                },
                initData: function(){
                    var data = {
                        "code": "0",
                        "msg": "success",
                        "data": {
                            "product_detail_list": [{
                                "free_prd_id": "500",
                                "prd_name": "MCM 女士简约铆钉装饰双肩背包 MMK6AVE18IG001",
                                "content": "限时抢购",
                                "direction": null,
                                "price": "739900",
                                "img": ["https:\/\/m.360buyimg.com\/n1\/jfs\/t3259\/302\/8728697910\/284516\/b805804a\/58c8d111N669b2cfc.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t4678\/44\/56471314\/351112\/87caa9f7\/58c8d112N8e7aaa4f.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t4582\/59\/55122354\/251978\/9855272f\/58c8d113N8da82bc1.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t4447\/62\/49947346\/301270\/44a87ce\/58c8d111N6563b10e.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t3172\/295\/8691502145\/159098\/bd8fdf4d\/58c8d114N8f0d638b.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t3280\/253\/8645074796\/297757\/e6b2a575\/58c8d112Na5df0913.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t4450\/57\/47535841\/258332\/e59653b0\/58c8d113N8265d34b.jpg", "https:\/\/m.360buyimg.com\/n1\/jfs\/t4216\/128\/1960746762\/312359\/e9fe52d7\/58c8d110Na325527d.jpg"],
                                "cash_type": "3",
                                "sold_cnt": "751",
                                "image_url": "https:\/\/m.360buyimg.com\/n1\/jfs\/t3259\/302\/8728697910\/284516\/b805804a\/58c8d111N669b2cfc.jpg",
                                "origin_price": 100,
                                "show_price": 10000,
                                "min_pur_amount": 9710000,
                                "title": "限时抢购",
                                "buyTime": "2018/09/10 15:00:00",
                                "bgcolor": "#a9b2ba",
                                "skuId": "508"
                            }]
                        }
                    }

                    var dataStock = {
                        "code": "0",
                        "msg": "success",
                        "data": {
                            "500": {
                                "surplus_stock": "200",
                                "total_stock": "2000"
                            }
                        }
                    }
                    if(this.params.buynowList && this.params.buynowList.length > 0){
                        this.data.nowBuyItem = this.params.buynowList && this.params.buynowList[0];  
                    }
                    //this.data.nowBuyItem = this.params.buynowList && this.params.buynowList[0];
                    //debugger;
                    var me = this;
                    // data.data.product_detail_list.forEach(function(item , index){
                    //     var _skuId = item.free_prd_id;
                    //     var _stockItem = dataStock.data;
                    //     if(_stockItem && _stockItem[_skuId]){
                    //         var _stockItemInfo = _stockItem[_skuId];
                    //         item.stocks = parseInt(_stockItemInfo.surplus_stock/_stockItemInfo.total_stock * 100) ;
                    //         console.log(item.stocks);
                    //     }else{
                    //         item.stocks = 0;
                    //     }

                    //     ['min_month_amount', 'price', 'show_price', 'origin_price', 'min_pur_amount'].forEach(function (k) {
                    //         item[k] = me.formatPrice(item[k]);
                    //     });
                    // });

                    this.data.itemList = data.data.product_detail_list;
                    console.log(this.itemList)

                },
                toThousands: function (num) {
                    var num = (num || 0).toString(), result = '';
                    while (num.length > 3) {
                        result = ',' + num.slice(-3) + result;
                        num = num.slice(0, num.length - 3);
                    }
                    if (num) { result = num + result; }
                    return result;
                },
                formatPrice: function (price) {
                    price = +price;
                    if (+price < 0 || isNaN(price)) {
                        return '--';
                    } else {
                        price = (price / 100).toFixed(2);
                        var num = price.split('.');
                        var integer = this.toThousands(num[0]);
                        var decimal = num[1];

                        return [integer, decimal].join('.');
                    }
                },
                getLocalPackageUrl: function (free_prd_id, channel_type) {
                    // var url = encodeURIComponent(`${location.origin}/product/baina/detail.html?free_prd_id=${free_prd_id}&channel_type=${channel_type}`);
                    // var localUrl = encodeURIComponent(`product/baina/pages/detail.html?free_prd_id=${free_prd_id}&channel_type=${channel_type}`);
                    // return `jtjr://web?url=${url}&zipId=10000&entry=${localUrl}`;
                    var url = encodeURIComponent(location.origin+'/product/baina/detail.html?free_prd_id='+free_prd_id+'&channel_type='+channel_type);
                    var _zipId = util.getQuery('pkgZipId') || '10000';
                    var localUrl = encodeURIComponent('product/baina/pages/detail.html?free_prd_id='+free_prd_id+'&channel_type='+channel_type);
                    return 'jtjr://web?url='+url+'&zipId='+ _zipId +'&entry='+localUrl;
                },
                toBuy: function (prdid) {
                        
                },
                addKeyValue: function (url, key, value) {
                    url = url.replace(/？/g, "?");//异常处理
                    var reg = /key[=]/,
                        hasQuery = /\?/.test(url);
                    var hasAnchor = url.indexOf('#') > -1;
                    if (reg.test(url)) {//进行替换
                        url = url.replace(reg, key + "=" + value);
                    } else {//没有，则进行追加
                        url = hasAnchor ? url.replace("#", (hasQuery ? "&" : "?") + key + "=" + value + "#") : (url + (hasQuery ? "&" : "?") + key + "=" + value);
                    }
                    return url;
                },
                getJybUrl: function (url) {
                    var _userid = util.getQuery("userid") || util.getCookie("userid") || "",
                        _token = util.getQuery("token") || util.getCookie("token") || "";
                    if (url.indexOf("http") > -1) {
                        url = this.addKeyValue(url, "userid", _userid);
                        url = this.addKeyValue(url, "token", _token);
                    }
                    return url;
                },
                hideRulesDialog: function () {
                    this.params.isShowDialog = true;
                },
                showRulesDialog: function () {
                    this.params.isShowDialog = false;
                },
                switchtips: function () {
                    console.log("switch tips");
                },

                submitBuy:function(){
                    //仅仅用于测试，微信还款类组件   真正环境是有js逻辑的  jyb.vue.jybwxhkpay
                },
                toDraw:function(){

                }

            }
        });



    }


    exports.register = function (opt) {
        var temp = _register(opt);
        return temp;
    }
    //--------------------- E 程序入口 ----------------------//
});