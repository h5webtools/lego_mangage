define(function (require, exports, module) {
    var jq = require('jquery');
    var $ = require('zepto');
    var moduleBasicInfo = require('./mpm.sys.basicInfo');
    var moduleUtil = require('./mpm.sys.util');
    var moduleCreateFile = require('./mpm.sys.createHtmlFile');
    var moduleDataCenter = require('./mpm.sys.dataCenter');
    var divComponentEdit = $('#divComponentEdit'),
        divLeftComList = $('#divLeftComList'),
        saveBtn = $('#savePageBtn'),
        divComponentSetPanel = $('#divComponentSetPanel'),
        addComBtn = $('#addComBtn'),
        addComCancelBtn = $('#addComCancelBtn'),
        divEditingPage = $('#divEditingPage'),
        divOperationItemList = $('#divOperationItemList'),
        tabNavRightNav = $("#tabNavRight"),
        releaseLock = $('#releaseLock'),
        nameSetDOM = $('#divNameSet'),
        nameSetTitle = $('#divNameSetTitle'),
        nameSetNewName = $('#divSetNewName'),
        nameSetsaveBtn = $('#divNameSetSaveBtn'),
        nameSetcancelBtn = $('#divNameSetCancelBtn'),
        cssName = { selected: 'selected' },
        isEmptyPage = true,
        pageInfo,
        domList, //全部组件的视图和控制条列表
        willAddType,
        willAddName,
        willAddComponentid; //数据库索引
    var leftDragItem, leftDropOn;
    var isSelectTabComponent = false;//tabList选择锚点元素
    var triggerUid;
    var dragFrom, dragTo, dropOn;
    //拖动元素，最后经过的一个，真正放下的那个
    // dragTo与dropOn须相同才触发调整位置的动作

    //楼层选择操作
    var tabOperation = {
        showCancelBtn: function () {
            jq('<div class="bottomPanel" id="cancelSelectBtn"><button type="button">取消</button></div>').one('click', function () {
                tabOperation.hideCancelBtn();
            }).appendTo('#divOperationItemList');
        },
        hideCancelBtn: function () {
            jq('#cancelSelectBtn').remove();
            $('#divOperationItemList').removeClass('selectTabComponent');
            isSelectTabComponent = false;
            jq(document).trigger('selectTabsEnd');
            return;
        }
    };

    //右侧控制条点击，可触发删除、移位、设置等, tab层级容器，子组件点击都在这里处理
    function clickItemCtrlBar(e) {
        var lastBar = divOperationItemList.children('.' + cssName.selected),
            lastV = divEditingPage.children('.' + cssName.selected);
        var clickItem = $(e.currentTarget);
        var target = $(e.target);
        var index = clickItem.attr('index') - 0;

        //tabList选择锚点元素
        if ($('#divOperationItemList').hasClass('selectTabComponent')) {
            $('#divOperationItemList').removeClass('selectTabComponent');
            isSelectTabComponent = false;
            jq(document).trigger('selectTabsEnd', moduleUtil.component.get(domList[index]));
            jq('#cancelSelectBtn').unbind('click').remove();
            return;
        }

        lastV.removeClass(cssName.selected);
        lastBar.removeClass(cssName.selected);
        clickItem.addClass(cssName.selected);

        divComponentSetPanel.show();

        divEditingPage.children().removeClass(cssName.selected).eq(index).addClass(cssName.selected);
        divComponentSetPanel.children().hide().eq(index).show();

        if (target.hasClass('btn')) {
            switch (target.attr('action')) {
                case 'set':
                    //设置模块名称
                    showNameSet(index);
                    break;
                case 'up':
                    if (index != 0 && domList.length > 1) {
                        moveUp(index);
                    }
                    break;
                case 'down':
                    if (index != domList.length - 1 && domList.length > 1) {
                        moveDown(index);
                    }
                    break;
                case 'del':
                    deleteItem(index);
                    break;
            }
            remarkIdx();
        }

        var id = clickItem.attr('id').replace(/rightbox_/ig, 'show_');

        //判断--如果点击的是图片组件  则位置不变   如果当前和前一个是同一个组件 并且是图片组件则位置不变
        var domTar = $(e.target).find("span");
        if (domTar && domTar.html() && domTar.html().indexOf("图片组件") > -1) {
            console.log("因为是图片所以位置不跳动");
        } else {
            window.scrollTo(0, $('#' + id).offset().top - 100);//调整至大约视线平行处
        }
    }

    function showNameSet(index) {
        $(document).trigger('subeditstart');
        var nowcomid = domList[index];
        nameSetTitle.attr("comid", nowcomid);
        var rightboxdom = $("#rightbox_" + nowcomid);
        var floorname = rightboxdom.attr("floorname") || '';

        nameSetNewName.val(floorname);

        nameSetTitle.html(nowcomid + "-模块名称设置");
        nameSetDOM.show();
    }

    function moveUp(index) {
        if (index == 0) {
            return;
        }

        var viewDoms = divEditingPage.children();
        var editDoms = divComponentSetPanel.children();
        var listDoms = divOperationItemList.children();

        viewDoms.eq(index - 1).before(viewDoms.eq(index));
        editDoms.eq(index - 1).before(editDoms.eq(index));
        listDoms.eq(index - 1).before(listDoms.eq(index));

        var moving = domList.splice(index, 1);
        domList.splice(index - 1, 0, moving[0]); //dom映射表调整
    }

    function moveDown(index) {
        moveUp(index + 1);
    }

    function deleteItem(index) {
        moduleUtil.confirm({
            msg: '确定删除"' + divOperationItemList.children().eq(index).find('span').html() + '"?',
            confirm: function () {
                var component = moduleUtil.component.get(domList[index]);
                jq(document).trigger('deleteComponentEnd', domList[index]);
                component && component.remove();
                domList = domList.filter(function (item, _index, arr) {
                    return _index != index;
                });
                remarkIdx();
            }
        });
    }

    //点击中间展示部分
    function clickInComView(e) {
        e.preventDefault();
        showSetPanel(e.target);
    }

    //在实时视图区点击时取到对应的控制条，激活设置面板
    function showSetPanel(el) {
        var $el = $(el);
        if ($el.hasClass('hotArea') || $el.hasClass('emptyTip')) {
            return;
        }
        if (el.id == 'divEditingPage') {
            return;
        }
        var foundYou = el;
        while (foundYou.parentNode.id != 'divEditingPage') {
            foundYou = foundYou.parentNode;
        }
        var index = $(foundYou.parentNode).children().index(foundYou);
        divOperationItemList.children().eq(index).trigger('click').get(0).scrollIntoView();
    }

    //保存页面
    function savePageData(callback, type) {
        //基本信息改版  兼容调整
        if (!$('#expireTime').val()) {
            alert('请先在基本信息中填写过期时间');
            return;
        }

        if (type != "publish") {
            $(document).trigger('subeditstart');
        }

        var allinput = $("#divComponentSetPanel input");
        for (var p = 0; p < allinput.length; p++) {
            if (/(^\s+)|(\s+$)/.test(allinput.eq(p).val())) {
                allinput.eq(p).val($.trim(allinput.eq(p).val())).change();
            }
        }
        var obj = moduleUtil.component.getMPMData();

        var allComponentName = getAllComponentName();
        var content = {
            list: domList,
            component: obj,
            allComponentName: allComponentName
        };

        content = JSON.stringify(content).replace(/\\/g, '\\');

        //判断链接包含在新的或者老的
        var pageindex = 0;

        moduleDataCenter.updatePageContent(pageInfo.id, content, function (num) {
            if (type != "publish") {
                $(document).trigger('subeditend');
            }
            if (callback) {
                callback(num);
            }
        });
    }

    //获取页面所有组件名称
    function getAllComponentName() {
        var listOperationItem = divOperationItemList.find('div.item');
        var allComponentName = {};
        for (var i = 0; i < listOperationItem.length; i++) {
            var comid = listOperationItem.eq(i).attr("id").replace("rightbox_", "");
            allComponentName[comid] = listOperationItem.eq(i).attr("floorname");
        }
        return allComponentName;
    }

    //重新索引一下
    function remarkIdx() {
        var listOperationItem = divOperationItemList.find('div.item');
        var litEditingPage = divEditingPage.children();
        var litComponentSetPanel = divComponentSetPanel.children();

        listOperationItem.each(function (index, dom) {
            $(dom).attr('index', index);
        });
        litEditingPage.each(function (index, dom) {
            $(dom).attr('index', index);
        });
        litComponentSetPanel.each(function (index, dom) {
            $(dom).attr('index', index);
        });

        if ((listOperationItem.length) !== litEditingPage.length || (listOperationItem.length != litComponentSetPanel.length)) {
            //moduleUtil.alert('页面出错，请保留现场，找开发解决');
            moduleUtil.trace(100);
        }
    }

    //增加组件
    function addCom() {
        if (willAddType == null || !willAddComponentid) {
            moduleUtil.alert('选择一个');
        } else {

            if (willAddType == 'bottomfixedtab' && $('.mpmBottomFixedTab', divEditingPage).length) {
                moduleUtil.alert('吸底导航已存在');
                return;
            }
            if (willAddType == 'topfixedtab' && $('.mpmTopFixedTab', divEditingPage).length) {
                moduleUtil.alert('吸顶导航已存在');
                return;
            }

            divComponentSetPanel.show().children().hide();

            var dom = moduleUtil.getComponent({
                uid: moduleUtil.uniqueId.get(),
                componentIndex: willAddComponentid,
                componentName: willAddName,
                name: willAddType, //组件名
                type: '' //组件标签名
            });

            if (!dom) {
                return;
            }

            console.info("mpm add " + willAddName + '_' + willAddComponentid);

            dom.init(function (component) {
                component.show();
                if (isEmptyPage) {
                    divEditingPage.find('.emptyTip').remove();
                    isEmptyPage = false;
                }
                remarkIdx();

                divOperationItemList.children().removeClass('selected').eq(domList.length - 1).addClass('selected');
                divEditingPage.children().removeClass('selected').eq(domList.length - 1).addClass('selected')[0].scrollIntoView();

                console.info("mpm add " + willAddName + '_' + willAddComponentid + ' end');
            });

            domList.push(dom.obj.uid);
        }
    }

    //左边列表点击
    function clickLeftGroup(e) {
        $(e.currentTarget).parent().toggleClass('open')
    }

    //左边拖放添加
    function dragAddCom() {
        if (leftDragItem && leftDropOn) {
            willAddType = $(leftDragItem).attr('mid');
            willAddComponentid = $(leftDragItem).attr('componentkey');
            willAddName = $(leftDragItem).attr('title');
            addCom();
        }
        leftDragItem = leftDropOn = null;
    }

    function changePosition() {
        var to = dragTo == dropOn ? dropOn : null, fromIdx, toIdx;
        if (to && dragFrom != to) {
            var $from = $(dragFrom), $to = $(dropOn);
            fromIdx = $from.attr('index') - 0;
            toIdx = $to.attr('index') - 0;
            if (fromIdx + 1 == toIdx) {
                return
            }
            console.log("******fromIdx*******:" + fromIdx + "*******toIdx******:" + toIdx);

            var viewDoms = divEditingPage.children();
            var editDoms = divComponentSetPanel.children();
            var listDoms = divOperationItemList.children();

            //右侧控制条的位置调整
            $to.before($from);
            $from = listDoms.eq(fromIdx);
            $to = listDoms.eq(toIdx);
            $to.before($from);

            //左边预览位置调整
            var $fromviewDoms = viewDoms.eq(fromIdx);
            var $toviewDoms = viewDoms.eq(toIdx);
            $toviewDoms.before($fromviewDoms);
            viewDoms.eq(toIdx).before(viewDoms.eq(fromIdx));

            //中间编辑位置调整
            var $fromeditDoms = editDoms.eq(fromIdx);
            var $toeditDoms = editDoms.eq(toIdx);
            $toeditDoms.before($fromeditDoms);
            editDoms.eq(toIdx).before(editDoms.eq(fromIdx));

            var moving1 = domList.splice(fromIdx, 1);
            if (fromIdx < toIdx) {
                domList.splice(toIdx - 1, 0, moving1[0]);//dom映射表调整
            } else {
                domList.splice(toIdx, 0, moving1[0]);
            }
            remarkIdx();
        }
    }

    function bindEvent() {
        divEditingPage.on('click', clickInComView);

        $('#divLeftComList').on('click', '.groupName', clickLeftGroup);

        console.log($('#divLeftComList').find(".com").length);
        $('#divLeftComList').on('dragstart', '.com', function (e) {
            console.log("dragstart");
            leftDragItem = e.target;
        });
        $('#divLeftComList').on('dragend', '.com', function (e) {
            console.log("dragend");
            e.preventDefault();
            dragAddCom();

        });

        divEditingPage.on('dragover', function (e) {
            e.preventDefault();
        });
        divEditingPage.on('drop', function (e) {
            e.preventDefault();
            leftDropOn = e.target
        });


        divOperationItemList.on('click', 'div.item', clickItemCtrlBar);

        divOperationItemList.on('dragstart', 'div.item', function (e) {
            dragFrom = e.target;
            dropOn = null;
        });
        divOperationItemList.on('dragover', 'div.item', function (e) {
            e.preventDefault();
            dragTo = e.currentTarget
        });
        divOperationItemList.on('dragend', 'div.item', function (e) {
            e.preventDefault();
            changePosition()
        });
        divOperationItemList.on('drop', 'div.item', function (e) {
            e.preventDefault();
            dropOn = e.currentTarget;
        });

        //中间显示区域的拖拽
        divEditingPage.on('dragstart', 'div', function (e) {
            console.log(e);
        });

        divEditingPage.on('dragend', 'div', function (e) {
            console.log(e);
        });

        saveBtn.on('click', function () {
            savePageData(function (json) {
                if (json.code == 0) {
                    moduleUtil.alert('保存成功');
                    moduleCreateFile.createFile(function(){

                    } , 'save');
                } else {
                    moduleUtil.alert('保存失败');
                }
            });
        });

        tabNavRightNav.on("click", "li", function (e) {
            var index = $(this).attr("tabindex");
            //debugger;
            $(".tab-panel").hide().eq(index).show();
            $(this).siblings().removeClass("on");
            $(this).addClass("on");

        });


        jq('#divEditingPage').on('click', '.mpm_show_tips span:nth-child(1)', function (e) {
            console.log('up');
            var index = jq(e.target).closest('[_mpm_show_box_][index]').attr('index') - 0;
            moveUp(index);
            remarkIdx();
        });

        jq('#divEditingPage').on('click', '.mpm_show_tips span:nth-child(2)', function (e) {
            console.log('down');
            var index = jq(e.target).closest('[_mpm_show_box_][index]').attr('index') - 0;
            moveDown(index);
            remarkIdx();
        });


        jq('#divEditingPage').on('click', '.mpm_show_tips span:nth-child(3)', function (e) {
            console.log('del');
            var index = jq(e.target).closest('[_mpm_show_box_][index]').attr('index') - 0;
            deleteItem(index);
            remarkIdx();
        });


        //名称设置事件
        nameSetcancelBtn.on("click", function (e) {
            nameSetDOM.hide();
            $(document).trigger('subeditend');
        });

        nameSetsaveBtn.on("click", function (e) {
            var nowcomid = nameSetTitle.attr("comid");
            var rightboxdom = $("#rightbox_" + nowcomid);
            var nowfloorname = nameSetNewName.val();

            if (!nowfloorname) {
                moduleUtil.alert("请正确填写模块名称");
                return;
            }

            rightboxdom.attr("floorname", nowfloorname);

            rightboxdom.find('span').html(nowfloorname);
            nameSetDOM.hide();
            $(document).trigger('subeditend');
        });
    }


    jq(document).on('selectTabComponent', function (e, uid) {
        triggerUid = uid;
        isSelectTabComponent = true;
        $('#divOperationItemList').addClass('selectTabComponent');
        tabOperation.showCancelBtn();
    });

    //线上页面window._componentConfig
    exports.getPageContentSource = function () {
        return moduleUtil.component.getComponentConfig();
    };
    //线上页面window.pageConfig
    exports.getPageConfig = function () {
        return moduleUtil.component.getPageConfig();
    };


    //保存页面
    exports.savePageData = savePageData;

    //保存页面的时候，获取页面信息
    exports.getExtendJS = function () {
        return moduleUtil.component.getAllExtendJS();
    };

    exports.getAllCss = function () {
        return moduleUtil.component.getAllCSSString();
    };

    exports.getAllTemplate = function () {

        var arr = [];
        var div = $('<div>');

        for (var i = 0; i < domList.length; i++) {
            var component = moduleUtil.component.get(domList[i]);
            var HTMLString = component.getHTMLString();
            var dom = $(HTMLString);
            dom.find('p.placeHolder').remove();
            div.append(dom);
            arr.push(div.html());
            dom.remove();
        }

        return arr.join('\r\n');
    };


    var newStructureInit = function (config) {

        var allComponentNum = 0;
        var readyComponentNum = 0;


        domList = config.list;

        domList = domList.filter(function (item, index) {
            return item != null;
        });


        if (domList.length) {
            isEmptyPage = false;
            divEditingPage.css('background-image', 'none');
            divEditingPage.find('.emptyTip').remove();
        }

        var callback = function (paramComponent) {
            readyComponentNum++;
            if (allComponentNum > readyComponentNum) {
                return;
            }

            for (var i = 0; i < domList.length; i++) {
                var component = moduleUtil.component.get(domList[i]);
                var componentname = component.obj.name || '';
                if (i == (domList.length - 1)) {
                    component && component.show(function () {
                    });
                } else {
                    component && component.show();
                }

                var rightboxdom = $("#rightbox_" + domList[i]);
                if (rightboxdom.length > 0) {
                    rightboxdom.attr("componentname", componentname);
                    var nowfloorname = config.allComponentName && config.allComponentName[domList[i]] ? config.allComponentName[domList[i]] : (component.obj.componentName + domList[i].replace(/^com/ig, ''));
                    rightboxdom.attr("floorname", nowfloorname);
                    rightboxdom.find('span.name').html(nowfloorname);
                }
            }
            remarkIdx();
            bindEvent();

        };

        if (config.list.length == 0) {
            bindEvent();
            return;
        }

        for (var o in config.component) {
            var com = config.component[o];
            var dom = moduleUtil.component.create(com);
            dom.init(callback);
            allComponentNum++;
        }
    };

    //初始化页面
    exports.initializeStructure = function () {

        pageInfo = moduleBasicInfo.showMePageInfo();
        var contentList = JSON.parse(pageInfo.content || "[]") || [];

        var newDataStructrue = {
            list: [],
            component: {},
            allComponentName: {}
        };
        //数据结构调整
        if (!$.isArray(contentList) && contentList.list) {
            newDataStructrue = contentList;
        } else {//旧的数据结构转换一下
            for (var i = 0; i < contentList.length; i++) {
                var item = contentList[i];
                var uid = item.uid;
                var type = item.type;
                item.child = [];
                newDataStructrue.list.push(uid);
                newDataStructrue.component[uid] = item;
                if (type == "switchlist") {
                    for (var o in item.mpmTabs) {
                        var child = item.mpmTabs[o];
                        item.child.push(o);
                        child.parent_uid = uid;
                        newDataStructrue.component[child.uid] = child;
                    }
                    delete item.mpmTabs;
                }
            }
        }
        newStructureInit(newDataStructrue);
    };

    function toReleaseLock(){
      moduleDataCenter.releaseLock(pageInfo.id , function(json){
        if(json.code == 0){
          alert('释放锁成功');
        }else{
          alert('解锁失败');
        }
      })
    }
    exports.main = function () {
        divEditingPage.css('min-height', window.innerHeight - 90 > 620 ? window.innerHeight - 90 : 620);
        divLeftComList.find('img.comIcon').attr('draggable', false);
        $(document).on('subeditstart', function () {
            divComponentEdit.children().hide();
            divComponentEdit.show();
        });
        $(document).on('subeditend', function () {
            divComponentEdit.hide();
        });

        $("#divComponentSetPanel").on("change", "input[type='text']", function (e) {
            $(this).val($.trim($(this).val()));
        });

        releaseLock.on("click", toReleaseLock);
    };
});