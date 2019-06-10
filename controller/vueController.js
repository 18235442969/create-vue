const homeComtroller = async (ctx, next) => {
  let title = '你好ejs';
  await ctx.render('index',{
    title
  });
}

module.exports = {
  homeComtroller
}