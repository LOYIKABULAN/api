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
