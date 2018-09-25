module.exports = options => {
  return async function requestParam(ctx, next) {
    if(ctx.request.rawBody) {
      try {
        ctx.request.rawBody = JSON.parse(ctx.request.rawBody);
      } catch(e) {}
    }
    await next();
  }
}