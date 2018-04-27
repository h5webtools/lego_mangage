
module.exports = options => {
  return async function userAuth(ctx, next) {
    const userId = ctx.session.userid;
    const userName = ctx.session.userName;
    let body = ctx.body;
    this.ctx.logger.info('查看是否更新代码');
    if (ctx.request.url.indexOf('login') === -1 || ctx.request.url.indexOf('syncCallback') === -1 || ctx.request.url.indexOf('previewLock') === -1) {
      await next();
    } else {
      if(!userId || !userName){
        ctx.redirect('/login');
      }else{
        await next();
      }
    }
  }
}