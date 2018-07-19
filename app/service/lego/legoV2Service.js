'use strict';

const Service = require('egg').Service;

class LegoV2Service extends Service {

  async updatePageInfo(data) {
    let result = await this.app.mysql.get('dbLego').query(`update tb_page set page_content = ? , page_editdate = ? , last_save_erp = ? 
        where page_id= ? ` 
    , [data.pageContent, data.updateTime , data.user , data.pageId]);
    return result.affectedRows === 1;
  }

  async queryThemeList() {
    let queryList = await this.app.mysql.get('dbLego').query(`select t_theme_style_id, t_theme_id, label, config from t_theme_style where t_theme_id = 1 `);
    return queryList;
  }
}

module.exports = LegoV2Service;
