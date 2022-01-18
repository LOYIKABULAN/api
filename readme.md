# 一、项目初始化

## 1.npm 项目初始化

    npm init -y

生成`package.json`文件：

- 记录项目依赖

## 2.git初始化

    git init

生成`.git`隐藏文件夹,git本地仓库

## 3.创建readme文件

# 二、搭建项目

## 1.安装koa

    npm i koa
## 2.编写最基本的app

创建`src/main.js`
```
const Koa = require('koa');
const app = new Koa();
const port = 3000

app.use((ctx,next)=>{
    ctx.body = `hello world`
})

app.listen(port,()=>{
    console.log('server is running on http://localhost:%s',port);
})

```
## 3.测试
- 安装nodemon `npm i nodemon -g`
- 在`package.json`的`script`配置启动

```
"start": "nodemon ./src/main.js"
```
    

在终端使用 `npm start`

# 三、项目的基本优化

## 1.读取配置文件
安装dotenv，读取根目录中的`.env` 文件，将配置文件写在`process.env` 中
```
npm  i dotenv
```
创建.env文件
    APP_PORT = 8000

在`src/config/config.default.js`

```
const dotenv =require('dotenv')
dotenv.config()
// console.log(process.env.APP_PORT);
module.exports = process.env
```
改写main.js

    const {APP_PORT} = require('./config/config.default')

# 四、添加路由

路由：根据不同的URL，调用对应的处理函数

## 1.安装`koa-router`

    npm i koa-router

步骤：
 
1. 导入包
2. 实例化对昂
3. 编写路由
4. 注册中间件

## 2.编写路由

创建`src/router` 目录，编写`user.route.js`
```
// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
//GET /user/
router.get('/',(ctx,next)=>{
    ctx.body = 'hello user'
})

module.exports = router
```

## 3.改写`main.js`

```
// @ts-nocheck
const Koa = require('koa');
const app = new Koa();
const {APP_PORT} = require('./config/config.default')


const userRouter = require('./router/user.route')
app.use(userRouter.routes())

app.listen(APP_PORT,()=>{
    console.log('server is running on http://localhost:%s',APP_PORT);
})
```