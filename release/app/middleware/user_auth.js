/**
 * 用户登录验证
 */

module.exports = (options) => {
  const defaultOptions = {
    ignore: '',
    loginUrl: '/auth/login'
  };

  return async function (ctx, next) {
    const opts = Object.assign({}, defaultOptions, options);

    // 跳过/auth，以及opts.ignore中匹配的路径
    if (/^\/auth/.test(ctx.path) || (opts.ignore && opts.ignore.test(ctx.path))) {
      return await next();
    }

    if (!ctx.session.userinfo) {
      ctx.redirect(`${opts.loginUrl}?redirect_url=${encodeURIComponent(ctx.href)}`);
    } else {
      await next();
    }
  };
};
