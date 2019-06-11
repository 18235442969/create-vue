const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const router = new Router();

const controllers = require('./controller/vueController');

router.get('/', controllers.homeController);
router.post('/api/createTemplate', controllers.createTemplate);

app.use(KoaBody());
app.use(KoaStatic(path.join(__dirname, './assets')));
app.use(views('views', {
  extension: 'ejs'
}));
app.use(router.routes()).use(router.allowedMethods());


app.listen(8888, () => {
  console.log('server start')
});