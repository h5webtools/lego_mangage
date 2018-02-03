define(function (require, exports, module) {
    var $ = require('zepto'),
        moduleUtil = require('./mpm.sys.util'),
        moduleDataCenter = require('./mpm.sys.dataCenter');
    var divEditingPage = $('#divEditingPage'),
        myDOM = $('#divOtherExtraSet'),
        otherExtraBtn = $('#otherExtraBtn'),
        saveBtn = $('#otherExtraSaveBtn'),
        cancelBtn = $('#otherExtraCancelBtn'),
        colorSelect, colorText,colorSelectTo, colorTextTo;

    var pageId, oldData, tempData;

    function showSetting() {
        $(document).trigger('subeditstart');
        var color = oldData.bgColor || '#ffffff',
            colorTo = oldData.bgColorTo || '#ffffff';
        colorSelect.val(color);
        colorText.val(color);
        myDOM.show();
    }


    function saveEdit() {
        tempData = {};
        
        tempData.bgColor = colorText.val();
        tempData.bgColorTo = colorTextTo.val();
       
        divEditingPage.css({
            'background-color': tempData.bgColor,
            'background-image': 'none'
        });
        var str = JSON.stringify(tempData).replace(/\\/g, '\\\\');
        
        moduleDataCenter.updateOtherExtra(pageId, str, function(num) {
    		moduleUtil.alert('保存成功');
        	oldData = tempData;
        	cancelSave();
        });
    }

    function cancelSave() {
        myDOM.hide();
        $('.datepicker').hide();//日期选择控件去掉
        $(document).trigger('subeditend');
    }

    
    exports.getBackgroundColor = function(){
    	return oldData.bgColor;
    };
    
    exports.main = function (pageid, data) {
        pageId = pageid;
        oldData = data;
        
        if (oldData.bgColor) {//设置背景色
            divEditingPage.css('background-color', oldData.bgColor)
        }
        colorSelect = myDOM.find('input.color').eq(0);
        colorText = myDOM.find('input.color').eq(1);

        colorSelectTo = myDOM.find('input.colorto').eq(0);
        colorTextTo = myDOM.find('input.colorto').eq(1);

        otherExtraBtn.on('click', showSetting);
        saveBtn.on('click', saveEdit);
        cancelBtn.on('click', cancelSave);
        colorSelect.on('change', function () {
            colorText.val(colorSelect.val())
        });
        colorText.on('change', function () {
            colorSelect.val(colorText.val())
        });
        colorSelectTo.on('change', function () {
            colorTextTo.val(colorSelect.val())
        });
        colorTextTo.on('change', function () {
            colorSelectTo.val(colorText.val())
        });
    }
});