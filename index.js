const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();
const router = new Router();


const controllers = require('./controller/vueController');

router.get('/', controllers.homeComtroller);

app.use(views('views', {
  extension: 'ejs'
}));
app.use(router.routes()).use(router.allowedMethods());


app.listen(8888, () => {
  console.log('server start')
});