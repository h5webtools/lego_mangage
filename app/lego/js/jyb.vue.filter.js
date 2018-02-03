define(function(require, exports, module) {
    var  _cacheThisModule_ = '';

    function _register(config) {
        // 注册
        //处理图片URL
        Vue.filter('getImg', function(value , w ,  h) {
            if(w && h){
                return JD.img.getImgUrl(value , w ,h)
            }else{
               return JD.img.getImgUrl(value) 
            }
            
        });

        //给链接加RD（参数可以有多个，会自动拼接）
        Vue.filter('addRd', function(value, rd) {
            var _rd = Array.prototype.slice.call(arguments, 1).join('');

            if(!_rd){
                return value ? value.replace(/^http:/, '') : ''
            }else{
                _rd = _rd.trim();
                return value ? window.JD.url.addRd(value, _rd).replace(/^http:/, '') : ''
            }
        });

        //与PC端价格做对比
        Vue.filter('comparePrice', function(value, price) {
            //乘了又除是为了防止JS浮点数运算的BUG
            var gap = Math.round(parseFloat(price) * 100 - parseFloat(value) * 100) / 100
            return gap > 0 ? '比电脑省￥' + gap : ''
        });

        //生成价格标签
        Vue.filter('formatPrice', function(value) {
            var pieces = parseFloat(value).toFixed(2).toString().split('.')
            return ['<span>￥</span>', pieces[0], '<span>.', pieces[1], '</span>'].join('')
        });


 //生成价格标签
        Vue.filter('formatPrice2', function(value) {
       
            var pieces = parseFloat(value).toFixed(2).toString().split('.')
            return ['<i>￥</i>', '<span>', pieces[0], '.</span>',pieces[1]].join('')
        });


        //左侧补个零，9 -> 09
        Vue.filter('leftPadZero', function(str) {
            str += ''
            return str.length == 1 ? '0' + str : str
        });

        //Vue.filter('martComparePrice',function(item, isWX){
        //    var diff;
        //    if (isWX) {
        //        diff = item.dwNewPrice - item.dwWeChatPrice;
        //    } else {
        //        diff = item.dwNewPrice - item.dwMQQPrice;
        //    }
        //    return diff;
        //});
        //
        //Vue.filter('martGetIntPart',function(item, isWX){
        //    var data;
        //    if (isWX) {
        //        data = item.dwWeChatPrice - 0;
        //    } else {
        //        data = item.dwMQQPrice - 0;
        //    }
        //    return data.toFixed(0);
        //});
        //
        //Vue.filter('martGetDecimalPart',function(item, isWX){
        //    var data;
        //    if (isWX) {
        //        data = item.dwWeChatPrice - 0;
        //    } else {
        //        data = item.dwMQQPrice - 0;
        //    }
        //    return (data.toFixed(2) + '').replace(/^.*\\./, '.');
        //});

    }


    exports.init = function() {
        _register();
    }
    //--------------------- E 程序入口 ----------------------//
});

