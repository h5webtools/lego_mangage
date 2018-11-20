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
            tabIndex: 0
          }
        };
      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
      },
      methods: {
        getRanklist: function (data) {
          var list = [],
            _ranks = data;
          if (_ranks == 0) {
          } else {
            for (var rank in _ranks) {
              list.push({
                tel: rank,
                score: parseFloat(_ranks[rank].score / 100, 2) + "元",
                extra: _ranks[rank].extra || ""
              })
            }
          }
          return list;
        },
        getMyRank: function (data) {
          var _rank = data,
            myRank = _rank.rank,
            score = _rank.score,
            extra = _rank.extra,
            myRankList = {};
          if (myRank == false) {
            myRankList.myRank = "未上榜";
          } else {
            myRankList.myRank = myRank;
          }
          if (score == false) {
            myRankList.score = 0;
          } else {
            myRankList.score = score;
          }
          if (!extra) {
            myRankList.extra = "暂无";
          } else {
            myRankList.extra = extra;
          }
          return myRankList;
        },
        getTableContentArr: function (data) {
          var rankKeyArr = [];
          data.forEach(function (item, index) {
            console.log(item.rankkey);
            rankKeyArr.push(item.rankkey);
          });
          console.log(rankKeyArr);
          return rankKeyArr;
        },
        strAmount: function (str) {
          var result="", 
          index = 0,  
          len = str.length,  
          i = len-1,  
          arr = str.split("");  
          str = str + "";
          while(len-index>0){  
              len>=index&&len-index!==len && arr.splice(len-index,0,",");  
              index+=3;  
              i-=4;  
          };  
          return arr.join("")
        },
        loadData: function () {
          var me = this;
          if (this.data.didFinish) return; //已经加载完成了
          var data = { "code": "0", "data": { "rank_lists": { "ranking": { "135****8816": { "rank": 1, "score": "40000000", "extra": "1000\u5143" }, "130****6054": { "rank": 2, "score": "35908081", "extra": "888\u5143" }, "138****2188": { "rank": 3, "score": "35080000", "extra": "500\u5143" }, "180****0969": { "rank": 4, "score": "30677712", "extra": "500\u5143" }, "157****2166": { "rank": 5, "score": "20645120", "extra": "500\u5143" }, "136****6613": { "rank": 6, "score": "20320548", "extra": "100\u5143" }, "137****2737": { "rank": 7, "score": "20271232", "extra": "100\u5143" }, "189****2161": { "rank": 8, "score": "20000000", "extra": "100\u5143" }, "186****7713": { "rank": 9, "score": "18990000", "extra": "100\u5143" }, "136****8710": { "rank": 10, "score": "16390000", "extra": "100\u5143" }, "158****1088": { "rank": 11, "score": "15332878" } }, "my_rank": { "rank": false, "score": false } }, "login_tel": "18566128767", "timestamp": 1504602678 } };

          var _ranks = data.data.rank_lists.ranking; //排行榜数据

          //表名对应的列键值 [rank , score , extra] 并且列的展示顺序同此
          this.data.rankKeyArr = this.getTableContentArr(this.params.tableContentArr);

          //对返回的列表进行处理为[{tel:"" , score:"" , extra:"" } , {tel:"" , score:"" , extra:"" }]
          this.data.itemList = this.getRanklist(_ranks);

          //对我的数据进行处理myRankList = {myRank:20 , score:2000 , extra:"iphone7"}
          this.data.myRankList = this.getMyRank(data.data.rank_lists.my_rank);

          this.data.didTrigger = true;
          this.data.didFinish = true;
          this.$nextTick(function () {
            if (window.MPM_EDIT) {
              $("[id='show_" + me.params.uid + "']").find(".lego-rank-list tr:nth-child(even)").css("background", me.params.evencolumncolor);
            } else {
              $("[uid='" + me.obj.uid + "']").find(".lego-rank-list tr:nth-child(even)").css("background", me.params.evencolumncolor);
            }
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
      tagName: "jybranklist"
    };
    _register(settings);
  }

});

