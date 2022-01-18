// @ts-nocheck
const Koa = require('koa');

const app = new Koa();

const userRouter = require('../router/user.route')

app.use(userRouter.routes())


module.exports = app