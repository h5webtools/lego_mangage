'use strict';

const Service = require('egg').Service;

class LegoV2Service extends Service {

  async queryThemeList(data) {
    this.ctx.logger.info('获取乐高颜色主题配置');

    let queryList = await this.app.mysql.get('dbLego').query(`select t_theme_style_id, t_theme_id, label, config from t_theme_style where t_theme_id = ? `, [data.theme_id]);
    return queryList;
  }

  async queryThemeComList(data) {
    this.ctx.logger.info('获取乐高颜色主题配置');

    const sql = `
      SELECT 
      theme_style.t_theme_style_id,
      theme_style.t_theme_id,
      theme_style.label,
      theme_style.config,
      t_theme_style_component.com_theme_config,
      t_theme_style_component.t_theme_com_version_id as component_style_version_id
      FROM (SELECT t_theme_style_id, t_theme_id, label, config from t_theme_style where t_theme_id = ? ) AS theme_style 
      LEFT JOIN t_theme_style_component ON theme_style.t_theme_style_id = t_theme_style_component.t_theme_style_id 
      ORDER BY theme_style.t_theme_style_id ASC
    `;

    let queryList = await this.app.mysql.get('dbLego').query(sql, [data.theme_id]);
    return queryList;
  }

  async getWidgetList(data) {
    this.ctx.logger.info('获取组件列表');

    const sql = `
    SELECT t_component.com_id, 
		t_component.name, 
		t_component.tag_name,
		t_component.component_group, 
    t_component.thumb, 
    t_component.component_type,
    t_theme_component_style_version.com_style_id as component_style_id, 
		t_theme_component_style_version.id as component_style_version_id, 
		t_theme_component_style_version.com_config, 
		t_theme_component_style_version.com_desc, 
		t_theme_component_style_version.com_js, 
		t_theme_component_style_version.com_css, 
    t_theme_component_style_version.thumb as com_img  FROM (SELECT *   FROM  t_theme_component  WHERE t_theme_id = ?) AS componentOrigin
		INNER JOIN t_component ON t_component.com_id  = componentOrigin.com_id
    INNER JOIN t_theme_component_style ON componentOrigin.t_theme_com_id = t_theme_component_style.t_theme_com_id
    INNER JOIN t_theme_component_style_version ON t_theme_component_style.new_version_id = t_theme_component_style_version.id
    ORDER BY  t_component.component_group ASC, t_component.priority ASC, t_component.com_id	ASC
    `

    // ORDER BY  FIELD(t_component.component_group, 1, 2, 3), t_component.priority ASC

    let result = await this.app.mysql.get('dbLego').query(sql
    , [data.theme_id]);
    return result;
  }
  /**
   * @description 新增活动页面基本信息
   */
  async insertPageBasicInfo(data) {
    this.ctx.logger.info('新增活动页面基本信息配置');
    this.ctx.logger.info(data);
    let insertData = this.app.mysql.get('dbLego').insert('t_page', {
      page_editdate: data.updateTime,
      page_title: data.pageTitle,
      page_menu: data.pageMenu,
      date_folder: data.dateFolder
      // page_act_id: data.actId
    })
    return insertData;
  }
  /**
   * @description 编辑活动页面基本信息
   */
  async updatePageBasicInfo(data) {
    this.ctx.logger.info('更新活动页面基本信息配置');
    this.ctx.logger.info(data);
    let result = await this.app.mysql.get('dbLego').query(`
    update t_page set 
    page_editdate = ? , 
    last_save_erp = ? ,
    page_menu = ? ,
    page_title = ?  
    where id= ? ` , 
     [data.updateTime , data.user , data.pageMenu , data.pageTitle , data.pageId ]);
    return result.affectedRows === 1;
  }
  /**
   * @description 新增活动页面
   * @param {*} data 
   */
  async insertPageInfo(data) {
    this.ctx.logger.info('新增活动页面配置 ');
    let insertData = this.app.mysql.get('dbLego').insert('t_page', {
      page_content: data.pageContent,
      page_editdate: data.updateTime,
      // page_act_id: data.actId
    })
    return insertData;
  }
  async updatePageInfo(data) {
    this.ctx.logger.info('更新活动页面配置');
    let result = await this.app.mysql.get('dbLego').query(`
    update t_page set 
    page_content = ? , 
    page_register_com = ?,
    page_editdate = ? , 
    last_save_erp = ? 
    where id= ? ` , 
     [data.pageContent, data.pageRegisterCom, data.updateTime , data.user , data.pageId]);
    return result.affectedRows === 1;
  }

  async getPage(data) {
    this.ctx.logger.info('获取活动页面配置 ');
/*     let result = await this.app.mysql.get('dbLego').query(`
    SELECT page_content, id FROM  t_page set 
    where id= ? ` , 
     [data.pageId]);
    return result; */

    let result = await this.app.mysql.get('dbLego').get('t_page', {id: data.pageId})
    return result;
  }
}

module.exports = LegoV2Service;
