
define(function (require, exports, module) {

  exports.getUrlQuery = function (name, url) {
    //参数：变量名，url为空则表从当前页面的url中取
    var u = url || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
  };

  exports.alert = function (txt, callback) {
    var html =
      `<div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <!-- <h4 class="modal-title">标题</h4> -->
            </div>
            <div class="modal-body text-center">
                <p>`+ txt + `</p>
            </div>
            <div class="modal-footer text-center">
                <button class="jc-btn btn-primary">确定</button>
            </div>
        </div>
    </div>`;
    var div = $(html);
    var btn = div.find('button');

    $('body').append(div);
    div.fadeIn(200);
    btn.one('click', function () {
      div.fadeOut(200, function () {
        div.remove();
        if (callback) {
          callback();
        }
      });
    });
  };
});