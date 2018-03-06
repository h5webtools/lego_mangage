module.exports = options => {
  return async function userAuth(ctx, next) {
    const userId = ctx.session.userid;
    const userName = ctx.session.userName;
    if (/^\/login/.test(ctx.request.url) || /^\/lego\/syncCallback/.test(ctx.request.url)) {
      console.log('2323');
      await next();
    } else {
      if(!userId || !userName) {
        ctx.redirect('/login');
      } else {
        await next();
      }
    }
  }
}