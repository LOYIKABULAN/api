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
