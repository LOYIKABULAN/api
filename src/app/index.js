// @ts-nocheck
//the module of the node.js
const path = require("path");

//the module of other
const Koa = require("koa");
const koaBody = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require('koa-parameter')
//self-written modules
const app = new Koa();

const router = require("../router");
const errHandler = require("./errHandler");
// console.log(process.cwd());
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
      maxFileSize:200*1024*1024,
    },
  })
);

app.use(KoaStatic(path.join(__dirname, "../upload")));
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods());
//统一的错误处理
app.on("error", errHandler);

module.exports = app;
