//1. 导入koa-router
const Router = require('koa-router')

//中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')
//控制器
const {add} = require('../controller/cart.controller')

//2. 实例化router对象
const router = new Router({prefix:'/carts'})
//3. 编写路由规则
// 1.添加到购物车，（判断商品是否存在，还未做判断）
router.post('/',auth,validator,add)
//3.1登录校验，格式
//4. 到处路由对象
module.exports = router