// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const {register,login} =require('../controller/user.controller')
const {userValidator,verifyUser,cryptPassword} =require('../middleware/user.middleware')
//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)

//登录接口
router.post('/login',login)

router.post('/login',)
module.exports = router