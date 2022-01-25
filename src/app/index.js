// @ts-nocheck
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

const userRouter = require('../router/user.route')

const errHandler = require('./errHandler')

app.use(koaBody())

app.use(userRouter.routes())

//统一的错误处理
app.on('error',errHandler)

module.exports = app