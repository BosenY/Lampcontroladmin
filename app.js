const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
var cors = require('koa-cors');
app.use(cors())


const index = require('./routes/index');
const users = require('./routes/users');
const list = require('./routes/list')   //用户列表
const resign = require('./routes/resign')  //注册
const collectdata = require('./routes/collectdata')  //储存收集的数据
const findalldata = require('./routes/findalldata')  //查找收集的数据


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/list', list.routes(), list.allowedMethods());
router.use('/resign', resign.routes(), resign.allowedMethods());
router.use('/collectdata', collectdata.routes(), collectdata.allowedMethods());
router.use('/findalldata', findalldata.routes(), findalldata.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;