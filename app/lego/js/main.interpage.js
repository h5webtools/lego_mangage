seajs.config({
    alias : {
        'jquery' : 'jquery',
        '$' : 'jquery',
        'mustache' : 'mustache',
        'jquery.cookie':'jquery.cookie',
        'vuefe': 'vuefe'
    }
});
define(function(require, exports, module){
    var $ = require('jquery'),moduleMustache = require('mustache');
    	require('jquery.cookie')($);
    	require('./lib/clipboard.min.js');
    var moduleDataCenter=require('./mpm.sys.dataCenter');
        require('vuefe');

    var loginOut = $('#loginout');
    var moduleUtilNew = require('./mpm.sys.util');
    var page_id , act_id;
        
    var pageSize=10,curPage= 1,searchKey,nowusername;
    var ulPage=$('#ulPagination'),tplItem=$('#tplTableItem').html(),
        tableList=$('#tbodyList'),
        inputSearchKey=$('#inputSearchKey'),searchKeyBtn=$('#searchKeyBtn');

    function getPaginationHTML(cur,max){
        var from,to,html=[];
        from=cur-4<1?1:cur-4;
        to=cur+4>max?max:cur+4;
        for(var i=from;i<=to;i++){
            html.push('<li class="'+(i==cur?'active':'page')+'"><a href="javascript:;">'+i+'</a></li>')
        }
        html.push('<li class="active"><a href="javascript:;">共'+max+'页</a></li>');
        return html.join('');
    }
    function onGetPage(d){
        var pageType = ['','活动','产品'];
        if(!d.result || d.result.length == 0){
            location.href = "edit.html?act_id="+act_id;
        }
        var formatResult  = d.result.map(function(item){
    		item.page_type_desc = pageType[item.page_type];

            if(item.old_page_path){
                item.page_path = item.page_path.split('act')[0]+"act/"+item.old_page_path;
            }else{
                item.page_path = item.page_path.replace("pagemaker" , item.date_folder)+"index.html";
            }
            
    		return item;
    	});
        console.log(formatResult);
        tableList.html(moduleMustache.to_html(tplItem,{list:formatResult}));
        var total= d.total,maxPage=Math.ceil(total/pageSize);
        ulPage.html(getPaginationHTML(curPage,maxPage));
        bindCopylink2();
    }
    
    function showMyPage(){
        var pageindex = 0;
        page_id = moduleUtilNew.getUrlQuery("page_id");
        act_id = moduleUtilNew.getUrlQuery("act_id");
        if(!page_id){
            location.href = "edit.html?act_id="+act_id;
        }else{
            moduleDataCenter.getConfirmPage(page_id , onGetPage )  ;
        }
        
    }
    function goToPage(e){
        curPage=$(e.target).text()-0;
        if(!searchKey){
            showMyPage();
        }else{
            
        }
    }

    function authorPage(e){
        var pid=e.currentTarget.getAttribute('pid');
        $("#divNameSetTitle").attr("pid",pid);
        $("#authorerpname").val('');
        $('#validTip').hide();
        $("#authorModal").modal('show');
    }
    function authorSetSave(){
        
        
    }

    function goEdit(e){
    	var pid=e.currentTarget.getAttribute('pid');
    	var page_locker= e.currentTarget.getAttribute('page_locker');
    	if(page_locker&&page_locker!=nowusername){
    		toast("此页面已经被"+page_locker+"锁定，请联系他解锁");
    	}else{
    		if(location.href.indexOf('_dev')!=-1){
    			location.href = 'edit.html?page_id='+pid+"&act_id="+act_id;
    		}else{
    			location.href = 'edit.html?page_id='+pid+"&act_id="+act_id;
    		}
    	}
    }
    
    //绑定复制链接事件   
    function bindCopylink(){
    	seajs.use('./js/lib/jquery.zclip', function (m) {
    	 	$(".copylink").zclip({
				path: "./swf/ZeroClipboard.swf",
				copy: function(){
					return $(this).attr('ppath');
				},
				afterCopy:function(){/* 复制成功后的操作 */
					toast('复制成功，ctrl+v使用');
		        }
			});
        
        });
    }
    
    function bindCopylink2(){
    	var clip = new Clipboard('.copylink');
    	clip.on('success', function(e) {
    		toast('复制成功，ctrl+v使用');
		});
    }
    
    function toast(msg){
    	var $copysuc = $("<div class='mpm-toast'><div>"+msg+"</div></div>");
		$("body").find(".mpm-toast").remove().end().append($copysuc);
		$(".mpm-toast").fadeOut(3000);
    }
    
   
    exports.main=function(){
        // moduleUtilNew.ckeckIsLogin();
        showMyPage();
        ulPage.on('click','li.page',goToPage);
        tableList.on('click','a.author',authorPage);
        tableList.on('click','a.edit',goEdit);  //进入编辑
      
        // inputSearchKey.on('keypress',function(e){if(e.keyCode==13){searchByKey()}});
        loginOut.on("click" , function(){
            moduleUtilNew.setCookie("jybactconfig" , "" , -1);
            location.href = location.href;
		});
        seajs.use('./css/bootstrap-3.3.7/bootstrap.min', function (m) {
			$('[data-toggle="tooltip"]').tooltip();
        });
    }
});