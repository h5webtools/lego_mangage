define(function(require, exports, module) {
   
    var commonFun = {
        methods:{
            getFormatPrice: function(price) {
            return String(price).replace (/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$1,')
            },
            formatDate: function(str) {
                return str.replace(/(\d{4})(\d{2})(\d{2})?/g, function($1,$2,$3,$4) {return !$4 ? $2+"-"+$3 : $2+"-"+$3+"-"+$4});
            },
            getYuan: function(num, format) {
                return format ? (num/100).toFixed(2) : num/100
            },
            getImgUrl:function(sourceUrl , size){
                return !isNaN(size) ? ("//m.360buyimg.com/n"+size+"/"+sourceUrl): "//m.360buyimg.com/n2/"+sourceUrl;
            },
            getUrl:function(sourceUrl){
                return "https://cdn.jyblife.com/product/baina/detail.shtml?free_prd_id="+sourceUrl;
            }
        }
        
    }

    exports.commonUtil = commonFun;
    
});