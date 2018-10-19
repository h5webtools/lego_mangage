define(function (require, exports, module) {
  var commonUtil = require('./common/util');
  function _register(opt) {
    Vue.component("productlist", {
      props: ["params"],
      functional: false,
      mixins: [commonUtil.commonUtil],
      data: function () {
        return {
          data: {
            didFinish: false,
            didTrigger: false,
            showMore: false,
            paramList: [],
            times: {
              miniSec: "0",
              sec: "0",
              minute: "0",
              hour: "0",
              day: "0"
            }
          }
        };
      },

      mounted: function () {
        console.log("mounted");
      },
      created: function () {

        console.log("created");
        this.loadData();

      },
      methods: {
        toBuy: function () {

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
            const num = price.split('.');
            const integer = this.toThousands(num[0]);
            const decimal = num[1];

            return [integer, decimal].join('.');
          }
        },
        loadData: function () {
          var json = { "code": "0", "data": { "act_conf": { "act_name": "\u7f51\u6613\u4e25\u9009\u4e13\u8f91", "act_rule": "", "top_pic_url": "https:\/\/images.jyblife.com\/banner\/914bantou.png", "bottom_pic_url": "", "bg_color": "#ffc1ce", "free_button_bg_color": "#ff6478", "free_button_text_color": "#ffe0e3", "confirm_button_bg_color": "#ff6478", "confirm_button_text_color": "#ffe0e3", "rule_button_bg_color": "#fddae2", "rule_button_text_color": "#fe6277", "act_url": "https:\/\/cdn.jyblife.com\/act\/baina\/28.html", "html_file_path": "\/data\/www\/yygl\/protected\/runtime\/free_prd_htmls\/28.html", "share_title": "\u7f51\u6613\u4e25\u9009\uff0c\u65f6\u5c1a\u5355\u54c1", "share_content": "\u7f51\u6613\u4e25\u9009\uff0c\u65f6\u5c1a\u5355\u54c1", "share_pic_url": "https:\/\/images.jyblife.com\/banner\/jybicon.png", "share_url": "https:\/\/cdn.jyblife.com\/act\/baina\/28.html", "tmp_type": "0" }, "product_detail_list": [{ "free_prd_id": "417", "prd_name": "\u9ed1\u51e4\u68a8 \u8d85\u58f0\u6ce2\u9676\u74f7\u9999\u85b0\u673a", "content": "", "price": "29900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/5424eb81a502e8f82b8d59acba08626c.png", "default_sku_id": "192330", "show_price": "2392220", "origin_price": "296600", "min_pur_amount": 400000 }, { "free_prd_id": "659", "prd_name": "\u7845\u85fb\u571f\u6d74\u5ba4\u5730\u57ab", "content": "\u5f3a\u529b\u5438\u6c34\uff0c\u9632\u6ed1\u901f\u5e72", "price": "13900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/3f0e2df5bc73b57a1413022d73d881d2.png", "default_sku_id": "2700", "show_price": "11120", "origin_price": "13900", "min_pur_amount": 190000 }, { "free_prd_id": "660", "prd_name": "\u9ed1\u51e4\u68a8 \u6e05\u65b0\u8da3\u7c89\u5168\u68c9\u56db\u4ef6\u5957 \u9752\u7c89\u62fc\u63a5", "content": "\u7f57\u83b1\u5236\u9020\u5546 \u7cbe\u68b3\u957f\u7ed2\u68c9,\u8bbe\u8ba1\u5e08\u7cfb\u5217", "price": "39900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/396a3cd3a427ed94b235b11913b44d8c.png", "default_sku_id": "2702", "show_price": "31920", "origin_price": "39900", "min_pur_amount": 530000 }, { "free_prd_id": "665", "prd_name": "\u5fae\u7535\u6d41\u6eda\u8f6e\u8eab\u4f53\u6309\u6469\u4eea", "content": null, "price": "18900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/9aa07a291c8e2c6f97e2f9d0ce2ba7c5.png", "default_sku_id": "2727", "show_price": "18900", "origin_price": "18900", "min_pur_amount": 250000 }, { "free_prd_id": "667", "prd_name": "\u8d1f\u79bb\u5b50\u53ef\u6298\u53e0\u4fbf\u643a\u5439\u98ce\u673a", "content": "\u9ad8\u6d53\u5ea6\u8d1f\u79bb\u5b50\uff0c2\u68633\u6e29", "price": "9900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/78ce876589eb084b8a348249787c1faf.png", "default_sku_id": "2772", "show_price": "7920", "origin_price": "9900", "min_pur_amount": 130000 }, { "free_prd_id": "669", "prd_name": "3\u5934\u6d6e\u52a8\u5f0f\u7535\u52a8\u5243\u987b\u5200", "content": null, "price": "13900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/9d0fa199b1c5b6be74e6bf5be2696cdf.png", "default_sku_id": "2749", "show_price": "13900", "origin_price": "13900", "min_pur_amount": 190000 }, { "free_prd_id": "671", "prd_name": "\u963f\u74e6\u63d0\u957f\u7ed2\u68c9\u8d85\u67d4\u5f31\u637b\u6d74\u5dfe", "content": null, "price": "8900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/fdab9b715e56706beab9213796d7d3c2.png", "default_sku_id": "2756", "show_price": "8900", "origin_price": "8900", "min_pur_amount": 120000 }, { "free_prd_id": "676", "prd_name": "\u51c0\u4e1d\u598d\u7535\u52a8\u5243\u6bdb\u673a", "content": null, "price": "12900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/1be545409dd21e50afc18e803029b847.png", "default_sku_id": "2778", "show_price": "12900", "origin_price": "12900", "min_pur_amount": 170000 }, { "free_prd_id": "677", "prd_name": "\u6162\u56de\u5f39\u8bb0\u5fc6\u7ef5\u62a4\u690e\u8170\u9760 \u52a0\u5927\u7248", "content": "\u5168\u68c9\u9488\u7ec7\uff0c\u6162\u56de\u5f39\u627f\u6258\u529b", "price": "8900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/ce42bd546a10c324c9dabe5e1951b9b8.png", "default_sku_id": "2781", "show_price": "7120", "origin_price": "8900", "min_pur_amount": 120000 }, { "free_prd_id": "678", "prd_name": "\u5168\u51c0\u7693\u9f7f\u53d8\u901f\u5f0f\u58f0\u6ce2\u7535\u52a8\u7259\u5237", "content": null, "price": "21900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/835612e5c90c335ad6977f84d34f8d23.png", "default_sku_id": "2785", "show_price": "21900", "origin_price": "21900", "min_pur_amount": 290000 }, { "free_prd_id": "658", "prd_name": "\u65e5\u5f0f\u548c\u98ce\u8d85\u58f0\u6ce2\u9999\u85b0\u673a", "content": "", "price": "19900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/59caefcb47fb85d4cd5e398f83c08e04.png", "default_sku_id": "2699", "show_price": "15920", "origin_price": "19900", "min_pur_amount": 270000 }, { "free_prd_id": "657", "prd_name": "\u513f\u7ae5\u6728\u5236\u5e73\u8861\u8f66", "content": null, "price": "39900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/38eb02c9810932e76e48e6aa1ac9b74f.png", "default_sku_id": "2698", "show_price": "39900", "origin_price": "39900", "min_pur_amount": 530000 }, { "free_prd_id": "426", "prd_name": "\u9ed1\u51e4\u68a8 \u7f57\u9a6c\u5047\u65e5\u6c38\u751f\u82b1", "content": null, "price": "43900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/9d59a22b5aff348b5aba5fc7e451ea4d.png", "default_sku_id": "2919", "show_price": "43900", "origin_price": "43900", "min_pur_amount": 580000 }, { "free_prd_id": "432", "prd_name": "all in one \u65e9\u9910\u673a", "content": null, "price": "25900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/f9e3965c98945af437989e663b81a8a6.png", "default_sku_id": "2031", "show_price": "25900", "origin_price": "25900", "min_pur_amount": 340000 }, { "free_prd_id": "648", "prd_name": "\u9e33\u9e2f\u706b\u9505", "content": null, "price": "25800", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/d8ab989c6770c3911a995e24cafe204a.png", "default_sku_id": "2687", "show_price": "25800", "origin_price": "25800", "min_pur_amount": 340000 }, { "free_prd_id": "649", "prd_name": "\u5347\u7ea7\u6b3e\u8bb0\u5fc6\u7ef5\u62a4\u690e\u8170\u9760", "content": "", "price": "7900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/6cc2e72b69918472e1f06e11a9b1f5d7.png", "default_sku_id": "2688", "show_price": "7900", "origin_price": "7900", "min_pur_amount": 110000 }, { "free_prd_id": "650", "prd_name": "\u5927\u9a6c\u58eb\u9769\u5957\u5200", "content": null, "price": 199900, "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/063a170c4cef38592c3f0527e8f47873.png", "default_sku_id": "2689", "show_price": 199900, "origin_price": 199900, "min_pur_amount": 2630000 }, { "free_prd_id": "651", "prd_name": "100\u5e74\u4f20\u4e16\u73d0\u7405\u9505", "content": null, "price": "26800", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/84cdbbf3049a4f44340c3c3cfb1bce51.png", "default_sku_id": "2745", "show_price": "26800", "origin_price": "26800", "min_pur_amount": 360000 }, { "free_prd_id": "653", "prd_name": "\u3010\u4f11\u606f\u597d\u3011\u591a\u529f\u80fd\u5348\u7761\u6795", "content": "\u653e\u677e\u81ea\u5728\u7684\u5348\u540e\u65f6\u5149", "price": "7900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/b1a476820860d6014e4cbf6f289303a6.png", "default_sku_id": "2693", "show_price": "6320", "origin_price": "7900", "min_pur_amount": 110000 }, { "free_prd_id": "654", "prd_name": "\u9ed1\u51e4\u68a8 Carat\u94bb\u77f3\u7092\u950530cm", "content": "", "price": "18000", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/d6339e6e8ae3b4c08613ab78f80a3e73.png", "default_sku_id": "2694", "show_price": "18000", "origin_price": "18000", "min_pur_amount": 240000 }, { "free_prd_id": "679", "prd_name": "\u5168\u68c9\u8fdb\u53e3\u57c3\u53ca\u957f\u7ed2\u68c9\u6d74\u5dfe", "content": "\u5f31\u637b\u5f3a\u5438\u6c34\uff0c\u8fdb\u53e3\u57c3\u53ca\u68c9", "price": "9900", "cash_type": "6", "image_url": "https:\/\/yanxuan.nosdn.127.net\/f89f0d42c7c745eac362f906a6fdc0e9.png", "default_sku_id": "2788", "show_price": "7920", "origin_price": "9900", "min_pur_amount": 130000 }] } }
          var me = this;
          if (json.code == 0) {
            var _data = json.data.product_detail_list;
            _data.map(function (item) {
              //var r = extend({}, item);
              ['price', 'show_price', 'origin_price', 'min_pur_amount'].forEach(function (k) {
                item[k] = me.formatPrice(item[k]);
              });
              return item;
            });
            this.data.paramList = _data;
            console.log(this.paramList);
          } else {
            console.log("获取商品信息失败");
          }
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