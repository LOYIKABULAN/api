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