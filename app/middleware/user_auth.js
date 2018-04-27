
module.exports = options => {
  return async function userAuth(ctx, next) {
    const userId = ctx.session.userid;
    const userName = ctx.session.userName;
    let body = ctx.body;
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