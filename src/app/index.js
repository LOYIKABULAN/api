// @ts-nocheck
//the module of the node.js
const path = require("path");

//the module of other
const Koa = require("koa");
const koaBody = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require("koa-parameter");
const cors = require('koa2-cors')
// const session = require('koa-generic-session')
// const {store} = require('../cache/_redis')
//self-written modules
const app = new Koa();

app.use(cors());
const router = require("../router");
const errHandler = require("./errHandler");
app.use(
  koaBody({
    multipart: true, //Parse multipart bodies, default false
    formidable: {
      // {Object} Options to pass to the formidable multipart parser
      //!Ii is not recommend to use relative paths in configuration options
      //?the relative path in the configuration item, not relative to the current file, relative to process.cwd() :The process.cwd() method returns the current working directory of the Node.js process.
      //__dirname The directory name of the current module. This is the same as the path.dirname() of the __filename.
      // uploadDir: path.join(__dirname, "../upload"), // {String} Sets the directory for placing file uploads in, default os.tmpDir():Returns the operating system's default directory for temporary files as a string.
      keepExtensions: true, // {Boolean} Files written to uploadDir will include the extensions of the original files, default false
      maxFileSize: 200 * 1024 * 1024,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);

//redis
// app.keys = ['keys','keyskeys']
// app.use(session({

//       // key:'weibo.sid',//cookie的name，默认是koa.sid
  
//       // prefix:'weibo:sess',//redis key的前缀，默认是koa:sess
  
//       // cookie:{
  
//       //    path:'/',
  
//       //    httpOnly:true,//表示key(weibo.sid)这个值只能在server端修改，不能在客户端修改
  
//       //    maxAge:24*60*60*1000, //cookie的过期时间，登录的过期时间
  
//       // },
  
//        ttl:24*60*60*1000,//redis的过期时间，默认和cookie过期时间保持一致
  
//       store:store
  
//   }))

app.use(KoaStatic(path.join(__dirname, "../upload")));
app.use(parameter(app));
//allowedMethods，顾名思义：就是当前接口运行的method。 比如，一个提供数据的接口，就可以设置为GET， 当客户端发送POST请求时，就会直接返回失败。
app.use(router.routes()).use(router.allowedMethods());
//统一的错误处理
app.on("error", errHandler);



module.exports = app;
