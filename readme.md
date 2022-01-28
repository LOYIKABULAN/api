# 一、项目初始化

## 1.npm 项目初始化

    npm init -y

生成`package.json`文件：

- 记录项目依赖

## 2.git 初始化

    git init

生成`.git`隐藏文件夹,git 本地仓库

## 3.创建 readme 文件

# 二、搭建项目

## 1.安装 koa

    npm i koa

## 2.编写最基本的 app

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

- 安装 nodemon `npm i nodemon -g`
- 在`package.json`的`script`配置启动

```
"start": "nodemon ./src/main.js"
```

在终端使用 `npm start`

# 三、项目的基本优化

## 1.读取配置文件

安装 dotenv，读取根目录中的`.env` 文件，将配置文件写在`process.env` 中

```
npm  i dotenv
```

创建.env 文件
APP_PORT = 8000

在`src/config/config.default.js`

```
const dotenv =require('dotenv')
dotenv.config()
// console.log(process.env.APP_PORT);
module.exports = process.env
```

改写 main.js

    const {APP_PORT} = require('./config/config.default')

# 四、添加路由

路由：根据不同的 URL，调用对应的处理函数

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

# 五、目录结构优化

## 1.将 http 服务和 app 页面拆分

创建`src/app/index.js`

```
// @ts-nocheck
const Koa = require('koa');

const app = new Koa();

const userRouter = require('../router/user.route')

app.use(userRouter.routes())


module.exports = app
```

改写`main.js`

```
// @ts-nocheck
const {APP_PORT} = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT,()=>{
    console.log('server is running on http://localhost:%s',APP_PORT);
})

```

## 将路由拆分和控制器拆分

路由`user.route.js`：解析 URL，分布给控制器对应方法

```
// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const {register,login} =require('../controller/user.controller')

//注册接口
router.post('/register',register)

//登录接口
router.post('/login',login)

router.post('/login',)
module.exports = router
```

控制器`user.controller.js`：处理不同的业务

```
class UserController{
    async register(ctx,next){
        ctx.body = '用户注册成功'
    }
    async login(ctx,next){
        ctx.body = '用户登录成功'
    }
}
module.exports = new UserController()
```

# 六、解析 body

## 1.安装 koa-body

    npm i koa-body

## 2.改写 app.js

```
// @ts-nocheck
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const userRouter = require('../router/user.route')
app.use(koaBody())
app.use(userRouter.routes())
module.exports = app
```

## 3.解析请求数据

改写`user.controller.js`

```
const { createUser } = require('../service/user.service')
class UserController{
    async register(ctx,next){
        //1.获取数据
        // console.log(ctx.request.body);
        const {user_name,password} = ctx.request.body;
        //2.操作数据库
        const res = await createUser(user_name,password)
        // console.log(res);
        //3. 返回结果
        ctx.body = '用户注册成功'
    }
    async login(ctx,next){
        ctx.body = '用户登录成功'
    }
}
module.exports = new UserController()
```

## 4.拆分 service 层

service 层主要是做数据库处理
创建`src/service/user.service.js`

```
class UserService {
    async createUser(user_name,password){
        // TODO:写入数据库
        return '写入数据库成功'
    }
}
module.exports = new UserService()
```

# 七、数据库操作

sequelize ORM 数据库工具

ORM：对象关系映射

- 数据表映射（对应）一个类
- 数据表中的数据行对应一个对象
- 数据表字段对应对象属性
- 数据表的操作对应对象的方法

## 1. 安装 sequelize

    npm i mysql2 sequelize

## 2. 连接数据库

`src/db/seq.js`

```
// @ts-nocheck
const { Sequelize } = require("sequelize");
const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
});
//用来测试是否成功连接数据库
seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

module.exports = seq;

```

# 八、创建 User 模型

## 1.拆分 Model 层

sequelize 主要通过 Model 对应数据表
创建`src/model/user.model.js`

```
// @ts-nocheck

const {DataTypes} = require('sequelize')

const seq = require('../db/seq')
//创建模型（Model zd_user -> zd_users
const User = seq.define('zd_user',{
    //id 会被sequelize 自动创建管理
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        Comment:'用户名，唯一'
    },
    password: {
        type:DataTypes.CHAR(64),
        allowNull:false,
        Comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        Comment:'是否为管理员，0：不是管理员（默认）；1：是管理员'
    }
},{
    timestamps:true//false 是时候默认不创建时间更新时间如上传时间
})

//强制同步数据库（创建数据表）
// User.sync({force:true})

module.exports = User
```

# 九、添加用户入库

所有数据的操作都在 Service 层完成，Service 调用 Model 完成数据库操作

改写`src/service/user.service.js`

```
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // User.create({
    //   // 表的字段
    //   user_name: user_name,
    //   password: password
    // })

    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }
}

module.exports = new UserService()
```

同时, 改写`user.controller.js`

```
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()

```

# 十、错误处理

在控制器中对不同的错误进行处理，返回不同类型的错误提示，提高代码质量。

```
// @ts-nocheck
const { createUser, getUserInfo } = require("../service/user.service");
class UserController {
  async register(ctx, next) {
    //1.获取数据
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    //（1）合法性
    if (!user_name || !password) {
      console.error("用户名密码为空", ctx.request.body);
      ctx.status = 400;
      ctx.body = {
        code: "10001",
        message: "用户名密码为空",
        result: "",
      };
      return;
    }
    //（2）合理性
    if (getUserInfo({ user_name })) {
      ctx.status = 409;
      ctx.body = {
        code: 10002,
        message: "用户已经存在",
        result: '',
      };
      return;
    }
    //2.操作数据库
    const res = await createUser(user_name, password);
    // console.log(res);
    //3. 返回结果
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "用户登录成功";
  }
}
module.exports = new UserController();
```

在 service 中封装函数

```
// @ts-nocheck
const User = require("../model/user.model");
class UserService {
  async createUser(user_name, password) {
    // TODO:写入数据库
    const res =await User.create({user_name, password});//可以使用try catch 来解决报错
    // console.log(res);
    return res.dataValues;
  }
  async getUserInfo({id,user_name,password,is_admin}){
    const whereOpt = {}

    id && Object.assign(whereOpt,{id})
    user_name && Object.assign(whereOpt,{user_name})
    password && Object.assign(whereOpt,{password})
    is_admin && Object.assign(whereOpt,{is_admin})

    const res = await User.findOne({
      attributes:['id','user_name','password','is_admin'],
      where:whereOpt
    })
    return res ? res.dataValues: null
  }
}

module.exports = new UserService();

```

# 十一、拆分中间件

## 1.拆分中间件

添加`src/middleware/user.middleware.js`

```
// @ts-nocheck
const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExisted,
} = require("../constants/err.type");
const userValidator = async (ctx, next) => {
  let { user_name, password } = ctx.request.body;
  //（1）合法性
  if (!user_name || !password) {
    console.error("用户名密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};
const verifyUser = async (ctx, next) => {
  let { user_name } = ctx.request.body;
  //（2）合理性
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户已存在", { user_name }, ctx.request.body);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.log(error, "获取用户信息错误");
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
};

```

## 2.统一错误处理通过

- 在出错的地方使用`ctx.app.emit` 提交错误
- 在 app 中 app.on 监听

编写统一错误定义文件`app/errHandler.js`

```
module.exports = {
  userFormateError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  userAlreadyExisted: {
    code: "10002",
    message: "用户已经存在",
    result: "",
  },
  userRegisterError:{
    code:'10003',
    message: '用户注册错误',
    result:''
  },
};

```

## 3.错误处理函数

```
module.exports = (err,ctx)=>{
  let status = 500
  switch(err.code){
      case '10001':
          status = 400;
          break;
      case '10002':
          status = 409;
          break;
      default:
          status = 500;
  }
  ctx.status = status;
  ctx.body = err
}
```

改写 `app/index.js`

```
app.on('error',errHandler)
```

# 十二、加密

将密码保存到数据库之前要进行加密处理
盐（Salt）[^1]

## 1.安装 bcryptjs

npm install bcryptjs

## 2.编写加密中间件

```
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  //hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;
  await next();
};
```

## 3.在 router 中使用

改写`user.router.js`

```
// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const {register,login} =require('../controller/user.controller')
const {userValidator,verifyUser,cryptPassword,verifyLogin} =require('../middleware/user.middleware')
//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)

//登录接口
router.post('/login',userValidator,verifyLogin,login)

router.post('/login',)
module.exports = router

```

[^1]: 在密码学中，是指通过在密码任意固定位置插入特定的字符串，让散列后的结果和使用原始密码的散列结果不相符，这种过程称之为“加盐”。

# 十三、登录验证

流程：

- 验证格式
- 验证用户是否存在
- 验证密码是否匹配
  改写`src/middleware/user.middleware.js`

```
// @ts-nocheck
const { getUserInfo } = require("../service/user.service");
const bcrypt = require("bcryptjs");
const {
  userFormateError,
  userAlreadyExisted,
  userNotExist,
  userLoginError,
  invalidPassword,
} = require("../constants/err.type");
const userValidator = async (ctx, next) => {
  let { user_name, password } = ctx.request.body;
  //（1）合法性
  if (!user_name || !password) {
    console.error("用户名密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};
const verifyUser = async (ctx, next) => {
  let { user_name } = ctx.request.body;
  //（2）合理性
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户已存在", { user_name }, ctx.request.body);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.log(error, "获取用户信息错误");
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  //hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;
  await next();
};
const verifyLogin = async (ctx, next) => {
  //1.判断用户是否存在（不存在报错）
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error('用户不存在',{user_name});
      ctx.app.emit('error',userNotExist,ctx)
      return;
    }


    //2.找到用户后匹配密码是否正确（不匹配报错）
    if (!bcrypt.compareSync(password,res.password)) {
      console.error();
      ctx.app.emit('error',invalidPassword,ctx)
      return;
    }
  } catch (error) {
    console.error('用户登录错误');
    ctx.app.emit('error',userLoginError,ctx)
    return;
  }

  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};

```

定义错误类型

```
module.exports = {
  userFormateError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  userAlreadyExisted: {
    code: "10002",
    message: "用户已经存在",
    result: "",
  },
  userRegisterError:{
    code:'10003',
    message: '用户注册错误',
    result:''
  },
  userNotExist:{
    code:'10004',
    message: '用户不存在',
    result:''
  },
  userLoginError:{
    code:'10005',
    message:'用户登录错误',
    result:''
  },
  invalidPassword:{
    code:'10006',
    message:'无效的密码',
    result:''
  }

};

```

改写路由

```
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
```

# 十四、用户的认证

登录成功后，给用户颁发一个令牌 token，用户在以后的每一次请求中携带 token。

jwt：JSON WEB TOKEN

- header:头部
- payload：载荷
- signature：签名

## 1.颁发 token

#### 1.安装 jsonwebtoken

    npm i jsonwebtoken

#### 2.在控制器中改写 login 方法

```
async login(ctx, next) {
    const {user_name} = ctx.request.body;
    //1.获取用户信息（在token的payload中，记录id，user_name,is_admin）
    try {
      //从返回结果对象中提出password属性，将剩下的属性放到res新的对象中
      const {password,...res}  = await getUserInfo({user_name})
      ctx.body={
        code:'0',
        message:'用户登录成功',
        result:{
          token:jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
        }
      }
    } catch (error) {
      console.error('登录失败',error);
    }
  }
```

#### 3.定义私钥

在 `.env`中定义

      WT_SECRET = zxd

## 2.用户认证

#### 1.创建 auth 中间件

```
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,jsonWebTokenError } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
    console.log(ctx.state.user);
    ctx.body = {
        code:'0',
        message:'修改密码成功',
        result:''
    }
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token失效", error);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("token无效", error);
        return ctx.app.emit("error", jsonWebTokenError, ctx);
    }
  }

  await next();
};

module.exports = {
  auth,
};

```

#### 改写 router

```
router.patch('/',auth)

```

# 十五、商品模块

## 1.路由自动加载

##### （1）新建`src/router/index.js`

```
const fs = require('fs')

const Router =require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach((file) =>{
  if (file!== 'index.js') {
    let r =   require('./'+file)
    router.use(r.routes())
  }
})

module.exports = router

```

##### （2）改写`src/app/index.js`

```
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
```

## 2.封装管理权限

##### （1）修改 auth.middleware.js

```
// @ts-ignore
const jwt = require("jsonwebtoken");
const {hasNotAdminPermission} =require('../constants/err.type')
// @ts-ignore
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,jsonWebTokenError } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token失效", error);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("token无效", error);
        return ctx.app.emit("error", jsonWebTokenError, ctx);
    }
  }

  await next();
};

const hadAdminPermission = async (ctx,next) =>{
  const {is_admin} = ctx.state.user
  if (!is_admin) {
    console.error('该用户没有管理员权限',ctx.state.user);
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }
  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
};

```

##### 2.新增 err.type.js

```
  hasNotAdminPermission:{
    code:'10103',
    message:'没有管理员权限',
    result:''
  }

```

##### 3.在 goods.route.js 中使用

```
router.post('/upload',auth,hadAdminPermission,upload)


```

# 十六、文件上传功能

## 1.在`app/index.js`中使用 koa-body 开启文件上传

```
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
```

## 2.新建`src/utils/upload.js`

```
// @ts-nocheck
const path = require("path");
const fs = require('fs')
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
module.exports = {
  async upload(ctx, next, fileType) {
    const { file } = ctx.request.files;
    const fileTypes = fileType;
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit("error", unSupportFileType, ctx);
      }
      const reader = fs.createReadStream(file.path);
      let filePath =
        path.join(__dirname, "../upload") + `/${path.basename(file.path)}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      ctx.body = {
        code: 0,
        message: "上传成功",
        result: {
          goods_img: path.basename(filePath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  },
};

```

## 3.在 controller.js 中改写

```
// @ts-nocheck
const path = require("path");
const fs = require('fs')
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
const {upload} = require('../utils/upload')
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async uploadImg(ctx, next) {
    upload(ctx,next,["image/jpeg", "image/png"])
  }
}

module.exports = new GoodController();

```

## 4.在 router 中改写

```
// @ts-nocheck
const path = require("path");
const fs = require('fs')
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
const {upload} = require('../utils/upload')
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async uploadImg(ctx, next) {
    upload(ctx,next,["image/jpeg", "image/png"])
  }
}

module.exports = new GoodController();

```


# 十七、统一参数校验

## 1.安装`koa-parameter`
 
  npm i koa-parameter

## 2.写validator 核验参数格式

```
const validator = async (ctx, next) => {
  const { goodFormatError } = require("../constants/err.type");
  try {
    ctx.verifyParams({
      goods_name: { type: "string", required: true },
      goods_price: { type: "number", required: true },
      goods_num: { type: "number", required: true },
      goods_image: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    goodFormatError.result = err.errors;
    return ctx.app.emit("error", goodFormatError, ctx);
  }
  await next();
};

module.exports = {
  validator,
};
```
