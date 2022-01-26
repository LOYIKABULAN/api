// @ts-nocheck
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();



const router = require('../router')

const errHandler = require('./errHandler')

app.use(koaBody())

app.use(router.routes()).use(router.allowedMethods())
//统一的错误处理
app.on('error',errHandler)

module.exports = app