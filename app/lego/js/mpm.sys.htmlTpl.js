define(function (require, exports, module) {
    var d = {};
    d.operationItem = '<div class="item" draggable="true" style="cursor: -webkit-grabbing;">' +
        '<span class="name"></span>' +
        '<div class="btnList">' +
        '<a class="btn set" action="set" href="javascript:;" title="设置"></a>' +

        '<a class="btn up" action="up" href="javascript:;" title="上移"></a>' +
        '<a class="btn down" action="down" href="javascript:;" title="下移"></a>' +
        //'<a class="btn" action="copy" href="javascript:;">复制</a>' +
        '<a class="btn del" action="del" href="javascript:;" title="删除"></a>' +
        '</div>' +
        '</div>'; //组件控制条        
    d.subTabItem = '<div class="subTab">' +
        '<p class="tabname"></p>' +
        '<div class="btnList">' +
        '<a class="btn subAdd" action="insert" href="javascript:;">嵌入组件</a>' +
        '<a class="btn subRemove" action="removesub" href="javascript:;">移除组件</a>' +
        '</div>' +
        '</div>'; //tab选项卡子列表,对应一个tab
    d.subComItem = '<div class="subCom"></div>'; //tab选项卡子列表里的单个组件,,,未使用
    d.twotitle = [];
    return d;
});