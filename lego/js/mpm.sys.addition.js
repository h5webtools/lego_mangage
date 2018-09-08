define(function (require, exports, module) {
    var $ = require('zepto'),
        moduleUtil = require('./mpm.sys.util'),
        moduleDataCenter = require('./mpm.sys.dataCenter');
    var myDOM = $('#divAdditionCode'),
        additionCodeBtn = $('#additionCodeBtn'),
        addCodeCancelBtn = $('#addCodeCancelBtn'),
        codeTextInput = myDOM.find('textarea');
    var pageId, oldData, tempData;

    function formatCode(code, m) {
        /**
         * legos不支持字符串，这里只能变相处理了
         */
        var str1 = ['<!', '--MPM#', 'include'].join('');
        var str2 = ['<!', '--', '#', 'include'].join('');
        m = m || 1;
        if (m == 1) {
            code = code.replace(new RegExp(str1, 'g'), str2);//读取后替换展现
        } else {
            code = code.replace(new RegExp(str2, 'g'), str1);//替换后写入保存
        }

        return code;
    }
    function showSetting() {
        $(document).trigger('subeditstart');
        codeTextInput.val(oldData);
        myDOM.show();
    }
    function onUpdate(num) {
        if (num >= 0) { moduleUtil.alert('保存成功'); }
        oldData = tempData;
        cancelSave();
    }

    exports.getSourceCode = function () {
        return '<!--additional code-->' + oldData + '<!--additional code-->';
    };
    exports.main = function (pageid, code) {
        pageId = pageid; oldData = code || '';
        oldData = formatCode(oldData);
    };
});