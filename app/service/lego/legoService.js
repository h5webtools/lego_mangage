'use strict';

const Service = require('egg').Service;

class LegoService extends Service {
  async queryPagesByCondition(condition) {
    let where = ['page_status=1'],
      table = 'tb_page',
      db = this.app.mysql.get('dbLego'),
      columns = [
        'p.old_page_path',
        'p.date_folder',
        'p.page_id',
        'p.page_name',
        'p.page_type',
        'p.page_path',
        'p.page_author',
        'p.page_author,DATE_FORMAT(p.page_createdate ,"%Y-%m-%d %H:%i:%s") as page_createdate',
        'DATE_FORMAT(p.page_publishdate ,"%Y-%m-%d %H:%i:%s") as page_publishdate',
        'p.page_thumb',
        'DATE_FORMAT(p.page_editdate ,"%Y-%m-%d %H:%i:%s") as page_editdate',
        'p.last_save_erp',
        'p.last_publish_erp',
        'p.page_locker',
        'p.page_act_id',
        'DATE_FORMAT(p.page_expire_time ,"%Y-%m-%d %H:%i:%s") as page_expire_time',
      ];
    if (condition.pageOwner) {
      where.push(`page_author='${condition.pageOwner}'`);
    }
    if (condition.pageName) {
      where.push(`page_name like '%${condition.pageName}%'`);
    }
    if (condition.pageActId) {
      where.push(`page_act_id='${condition.pageActId}'`);
    }
    if (condition.expireTime) {
      where.push(`page_expire_time like "${condition.expireTime}%"`);
    }
    if (condition.createStartTime && condition.createEndTime) {
      where.push(`page_createdate between '${condition.createStartTime}' and '${condition.createEndTime}'`);
    }
    try {
      const queryResult = await Promise.all([
        db.query(`select count(*) as total_count from ${table} as p where ${where.join(' and ')}`),
        db.query(`select ${columns.join(',')} from ${table} as p where ${where.join(' and ')} order by page_editdate DESC limit ${condition.start},${condition.offset}`)
      ]);
      return queryResult;
    } catch (e) {
      this.ctx.logger.error('按条件查询活动列表失败 ' + e.message);
      return null;
    }
  }
  /**
   * @description 查询组件列表
   * @param {*} ctype 
   * @param {*} cname 
   * @param {*} index 
   * @param {*} size 
   */
  async queryComponents(ctype, cname, index, size) {
    let where = [],
      whereStr = '',
      table = 'tb_component',
      db = this.app.mysql.get('dbLego'),
      limit = index * size,
      offset = (index - 1) * size;
    if (ctype) {
      where.push(`component_group='${ctype}'`);
    }
    if (cname) {
      where.push(`path_key like '%${cname}%'`);
    }
    whereStr = where.length > 0 ? ' where ' + where.join(' and ') : '';
    try {
      const queryResult = await Promise.all([
        db.query(`select count(*) as total_count from ${table} ${whereStr}`),
        db.query(`select id,tb_name,tb_desc,path_key,
                  tb_thumb,tb_group,DATE_FORMAT(create_date ,"%Y-%m-%d %H:%i:%s") as create_date,
                  DATE_FORMAT(edit_date ,"%Y-%m-%d %H:%i:%s") as edit_date,
                  component_group 
                  from ${table} ${whereStr} order by create_date desc limit ${offset},${limit}`)
      ]);
      return queryResult;
    } catch (e) {
      this.ctx.logger.error('查询组件列表失败 ' + e.message);
      return null;
    }
  }
  /**
   * 查询活动页面配置详情
   * @param {*} pageId 
   */
  async queryPageDetail(pageId) {
    let baseInfo = await this.app.mysql.get('dbLego').get('tb_page', {
      page_id: pageId,
      page_status: 1
    })
    return baseInfo;
  }
  /**
   * @description 批量查询
   * @param {*} pageList 
   */
  async queryMultiplePage(pageList) {
    let multiInfo = await this.app.mysql.get('dbLego').query(`select * from tb_page where page_status=1 and page_id in (${pageList})`)
    return multiInfo;
  }
  /**
   * @description 获取指定组件ID的样式
   * @param {*} componentId 
   */
  async queryComponentStyle(componentId) {
    let style = await this.app.mysql.get('dbLego').query(`
            select *,
            DATE_FORMAT(create_date ,"%Y-%m-%d %H:%i:%s") as create_date, 
            DATE_FORMAT(edit_date ,"%Y-%m-%d %H:%i:%s") as edit_date 
            from tb_component_style where component_id='${componentId}'`)
    return style;
  }
  /**
   * @description 按路径查询活动页面信息
   * @param {*} dirName 
   * @param {*} dateFolder 
   */
  async queryInfoByPath(dirName, dateFolder) {
    let pathRet = await this.app.mysql.get('dbLego').get('tb_page', {
      page_path: dirName,
      date_folder: dateFolder
    })
    return pathRet;
  }
  /**
   * @description 新增活动页面
   * @param {*} data 
   */
  async insertPageInfo(data) {
    this.ctx.logger.info('新增活动页面配置 '+ JSON.stringify(data));
    let insertData = this.app.mysql.get('dbLego').insert('tb_page', {
      page_id: data.pageId,
      page_name: data.actName,
      page_path: data.folder,
      date_folder: data.dateFolder,
      page_expire_time: data.expireTime,
      page_expire_url: data.expireUrl,
      page_type: data.type,
      page_author: data.author,
      page_createdate: data.createTime,
      share_img_url: data.shareImage,
      share_title: data.shareTitle,
      share_desc: data.shareDesc,
      page_extra: data.extra,
      page_act_id: data.actId
    })
    return insertData;
  }
  async updatePageInfo(data) {
    let result = await this.app.mysql.get('dbLego').query(`update tb_page set page_content = ? , page_editdate = ? , last_save_erp = ? 
        where page_id= ? ` 
    , [data.pageContent, data.updateTime , data.user , data.pageId]);
    return result.affectedRows === 1;
  }
  async updateBaseInfo(data){
    let result = await this.app.mysql.get('dbLego').query(`update tb_page set 
      page_path='${data.folder}',
      page_name='${data.pageName}', old_page_path='${data.oldUrl}', page_type='${data.pageType}',
      page_expire_time='${data.expireTime}', page_expire_url='${data.expireUrl}', share_img_url='${data.shareImage}',
      share_title='${data.shareTitle}', share_desc='${data.shareDesc}', page_extra='${data.extra}'  
      where page_id=${data.pageId}`);
    return result.affectedRows === 1;
  }
  /**
   * @description  按时间查询公告
   * @param {*} time 
   */
  async queryLegoNotice(time) {
    let result = await this.app.mysql.get('dbLego').query(`select 
        id,
        content,
        DATE_FORMAT(begin ,"%Y-%m-%d %H:%i:%s") as begin,
        DATE_FORMAT(end ,"%Y-%m-%d %H:%i:%s") as end 
        from tb_gonggao 
        where 
        begin <= '${time}' 
        and 
        end >= '${time}' 
        limit 1`);
    return result;
  }
  /**
   * @description 插入拷贝的pageId
   * @param {*} pageId 
   * @param {*} folder 
   * @param {*} dateFolder 
   * @param {*} actId     活动号
   */
  async insertCopyPage(pageId, folder, dateFolder, time, actId) {
    let insertRet = await this.app.mysql.get('dbLego').query(`INSERT INTO tb_page(page_type, page_name, page_path,
        share_img_url,share_title,share_desc,page_expire_time, 
        page_expire_url,page_bgcolor,page_content,
        page_thumb,page_addition,date_folder, 
        page_author,page_createdate,page_act_id) (SELECT tp.page_type, tp.page_name, '${folder}', share_img_url, share_title, share_desc,
        tp.page_expire_time, tp.page_expire_url, tp.page_bgcolor, tp.page_content, tp.page_thumb, tp.page_addition, '${dateFolder}',
        '${this.ctx.session.userAccount}', '${time}', '${actId}' FROM tb_page AS tp WHERE page_id=${pageId})`);
    return insertRet;
  }

  /**
   * @description 插入新的组件
   * @param {*} data Object
   */
  async insertComponent(data) {
    let insertRet = await this.app.mysql.get('dbLego').query(`INSERT INTO tb_component (
        tb_name, tb_desc, path_key, tb_thumb, create_date, edit_date, create_by, component_group) VALUES
         ('${data.modname}', '${data.moddesc}', '${data.modpathkey}', '${data.modthumb}', '${data.createTime}',
          '${data.createTime}', '${data.creator}', '${data.modgroupzu}')`);
    return insertRet;
  }

  /**
   * @description 插入组件样式
   * @param {*} data Object
   */
  async insertComponentStyle(data) {
    let insertRet = await this.app.mysql.get('dbLego').query(`INSERT INTO tb_component_style (
        component_id, tpl_url, com_desc, image, priority, create_date, edit_date, create_by) VALUES 
        (${data.component_id}, '${data.tpl_url}', '${data.com_desc}', '${data.image}', '${data.priority}',
        '${data.createTime}', '${data.createTime}', '${data.creator}')`);
    return insertRet;
  }

  async updateComponent(data) {
    let updateRet = await this.app.mysql.get('dbLego').query(`UPDATE tb_component SET 
        tb_name='${data.modname}', tb_desc='${data.moddesc}', path_key='${data.modpathkey}',
        tb_thumb='${data.modthumb}', edit_by='${data.user}', 
        component_group='${data.modgroupzu}', edit_date='${data.currentTime}' WHERE id='${data.uniqueid}'`);
    return updateRet;
  }

  async updateComponentStyle(data) {
    let updateRet = await this.app.mysql.get('dbLego').query(`UPDATE tb_component_style SET 
        tpl_url='${data.tpl_url}', com_desc='${data.com_desc}', image='${data.image}',
        priority='${data.priority}', edit_date='${data.currentTime}', 
        edit_by='${data.user}' WHERE id='${data.id}' AND component_id='${data.component_id}'`);
    return updateRet;
  }
}

module.exports = LegoService;
