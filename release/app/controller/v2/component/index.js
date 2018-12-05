'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');
const componentV2 = require('../../../constant/v2/component.js');
const componentGroupV2 = componentV2.componentGroup;

const DELETE_LOCK_KEY_FAILED = 610007;    // redis删除锁失败
const EMPTY_LOCK_DATA = 610008; // 没有获取到锁
const EMPTY_ACT_ID = 610009;    // 活动号为空
const INSTALL_FAILED = 610010; // 安装依赖失败
const INSTALL_FILE_NOT_EXIST = 610011; // package.json文件不存在
const READ_TEMPLATE_FAILED = 610012; // 读取模板文件失败
const WRITE_ACT_ENTRYFILE_FAILED = 610013; // 写js文件模板失败
const WRITE_DEPENDENCYFILE_FAILED = 610021; // 写package.json依赖文件失败
const CREATE_WEBPACK_ENV_FAILED = 610014; // 创建webpack指定环境
const MKDIR_FAILED = 610015; // 创建目录失败
const TRANSLATE_OLD_PATH_FAILED = 610016; // 迁移老文件失败
const CREATE_ACT_PAGE_FAILED = 610017; // 创建活动页面失败
const WEBPACK_CPMPILE_FAILED = 610018; // WEBPACK编译失败
const SUBMIT_GIT_FAILED = 610019; // 提交git仓库失败
const CREATE_RELEASETASK_FAILED = 610020; // 创建发布单失败
const QUERY_DATABASE_FAILED = 710010; // 查询数据库失败
const INSERT_DATA_FAILED = 710011;    // 插入数据库失败
const UPDATE_DATA_FAILED = 710012;    // 更新数据失败
const ACT_DIR_EXIST = 710013;         // 活动目录有冲突
const COPY_ACT_PAGE_FAILED = 710014;  // 拷贝新页面失败
const RELATE_PAGE_ACT_FAILED = 810010;  // 关联页面和活动号失败
const PAGE_ID_NOT_EXIST = 810011;       // 活动页面不存在

class ComponentController extends Controller {

  async getWidgetList() {
    // 默认 theme_id = 1
    this.ctx.logger.info('获取编辑页面下组件列表');
    let rawBody = this.ctx.request.rawBody;
    !rawBody.theme_id && (rawBody.theme_id = 1); 
    try {
      let widgetList = await this.service.lego.legoV2Service.getWidgetList(rawBody);
      // 获取组件后进行数据格式化（配置的json的改变）
      // widgetList = await this._formatWidget(widgetList);
      this.ctx.body = {
        code: 0,
        data: {
          widgetList: widgetList,
          componentGroup: componentGroupV2
        }
      }
    } catch(e) {
      this.ctx.logger.info('获取编辑页面下组件列表失败'+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: e.message()
      }
    }
  }

  async _formatWidget(widgetList) {
    let formatWidget = [];
    const self = this;

    Object.keys(componentGroupV2).forEach((component_group, component_group_index)  => {
        formatWidget.push({
          title: componentGroupV2[component_group],
          component_group: component_group,
          widgetList: [],
          widgetKeyList: {}
        })

        for(let i = widgetList.length - 1; i >= 0 ; i--){
          const widgetItem = widgetList[i];
          // (格式化json)放入对应的组中,  并且 将 同一个com_id 的多个样式重新组装shows的键名中
          if(component_group === widgetItem.component_group) {
            self._formatWidgetJSON(widgetItem);
            let currentKeyList = formatWidget[component_group_index].widgetKeyList
            if(!currentKeyList[widgetItem.com_id]) {
              currentKeyList[widgetItem.com_id] = []
            } 
            currentKeyList[widgetItem.com_id].push(widgetItem)

            // 将已经处理的从原widgetList 中移除， 加快遍历
            widgetList.splice(i, 1);
          }
        }

        this._formatWidgetStyle(formatWidget, component_group_index)

        

    })

    return formatWidget;
 
  }

  _formatWidgetJSON(component) {
    let com_config;
    try {
      com_config = JSON.parse(component.com_config);
    } catch(e) {
      this.ctx.body = {
        code: -1,
        msg: e.message()
      }
    }
    com_config.com_id = component.com_id;
    com_config.tag_name = component.tag_name;
    // 左侧缩略图
    com_config.thumb = com_config.thumb
    component.shows = [{
      com_desc: component.com_desc,
      com_img: component.com_img,
      tag_name: component.tag_name,
      style_id: component.component_style_id
    }]

    component.com_config = com_config
  }
  /**
   *     
     shows:[ //从数据库拉取 
      [{
        com_desc:'主题一 样式一1',
        com_img:'http://lego.jyb.com/images/product3.png',
        tag_name:'lego-headmap',
      },{
        com_desc:'主题一 样式二2',
        com_img:'https://images.jyblife.com/lego/legoconfig/productlist/show.4.png',
        tag_name:'lego-headmap',
      }]
    ],
    将widgetKeyList 合并到 widgetList 
   * @param {*} component 
   */
  _formatWidgetStyle(formatWidget, component_group_index) {
    let currentWidget = formatWidget[component_group_index];
    Object.keys(currentWidget.widgetKeyList).forEach(com_id => {
      if(currentWidget.widgetKeyList[com_id].length > 1) {
        let mergerWidget = {};
        currentWidget.widgetKeyList[com_id].forEach((styleItem, styleIndex) => {
          
          if (styleIndex > 0) {
            let currentShow = JSON.parse(JSON.stringify(styleItem.shows[0]));
            currentShow.com_config = styleItem
            mergerWidget.shows.push(currentShow)
          } else {
            mergerWidget = styleItem;
          }
        })
        currentWidget.widgetList.push(mergerWidget)
      } else {
        currentWidget.widgetList.push(currentWidget.widgetKeyList[com_id][0])
      }
    })

    delete formatWidget[component_group_index].widgetKeyList;
  }
}

module.exports = ComponentController;