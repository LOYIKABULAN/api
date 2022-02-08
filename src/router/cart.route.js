//1. 导入koa-router
const Router = require('koa-router')

//中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')
//控制器
const {add,findAll} = require('../controller/cart.controller')

//2. 实例化router对象
const router = new Router({prefix:'/carts'})
//3. 编写路由规则
//3.1登录校验，格式添加到购物车，（判断商品是否存在，还未做判断）
router.post('/',auth,validator,add)
//3.2获取购物车列表
router.get('/',auth,findAll)
//4. 到处路由对象
module.exports = router