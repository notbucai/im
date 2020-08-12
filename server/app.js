const Koa = require('koa');
const Router = require('@koa/router');
const logger = require('koa-logger');
const koaBody = require('koa-body');

const config = require('./config/index.config');
const db = require('./db/index');

const TLSSigAPIv2 = require('./utils/TLSSigAPIv2').Api;

const app = new Koa();
const router = new Router();
const genSig = new TLSSigAPIv2(config.sdkappid, config.key);
const PORT = 8796;

router.post('/login', (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log('username, password', username, password);
  const hasUser = db.hasUserByUsername(username);
  // 用户存在
  if (!hasUser) {
    // 存储账号密码
    db.addUser(username, password);
  }
  const isTrue = db.hasUser(username, password);

  if (!isTrue) {
    return ctx.body = {
      code: 400,
      data: '账号或密码错误',
      message: '账号或密码错误',
    }
  }
  return ctx.body = {
    code: 200,
    data: genSig.genSig(username, 2 * 60 * 60)
  }
});

router.get('/userlist', (ctx, next) => {

  const userlist = db.userList();

  return ctx.body = {
    code: 200,
    data: userlist
  }
});

app
  .use(logger())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log('http://0.0.0.0:' + PORT);
  });