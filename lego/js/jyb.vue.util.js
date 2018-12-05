define(function (require, exports, module) {

  var utilMethodes = {
    methods: {
      getPriceInt: function (price) {
        var _price = price - 0;
        return ~~_price;
      },
      getPriceDecimal: function (price) {
        var _price = price - 0;
        return (_price.toFixed(2) + '').replace(/^.*\./, '.');
      },
      customFun: function (type, item) {
        return this.$root.customFun(type, item);
      },
      splitArr: function (paramsArr, num, needEvery) {
        var arr = paramsArr,
          _returnArr = [];
        if (!arr) {
          _returnArr;
        }
        if (!num) {
          _returnArr;
        }
        for (var i = 0, len = arr.length; i < len; i += num) {
          if ((!needEvery && i + num <= len) || needEvery) {
            _returnArr.push(arr.slice(i, i + num));
          }
        }
        return _returnArr;
      }
    }
  };

  var common = {
    convertParams: function (obj) {
      if (typeof obj == "string" && /^fn:/.test(obj)) {
        return (new Function("", "return " + obj.replace("fn:", "")))();
      } else {
        return obj;
      }
    },
    runArrFun: function (execuedArr, objParams) {
      execuedArr.map(function (o, index) {
        o && o(objParams);
        execuedArr[index] = null; //执行过的销毁调
      })
    }

  };
  exports.commonUtil = {
    utilMethods: utilMethodes,
    common: common
  }
});