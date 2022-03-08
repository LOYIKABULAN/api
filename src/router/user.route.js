// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const {register,login,changePassword,changeAvatar,changeUserName} =require('../controller/user.controller')
const {userValidator,verifyUser,cryptPassword,verifyLogin} =require('../middleware/user.middleware')
const {auth} =require('../middleware/auth.middleware')

//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)

//登录接口
router.post('/login',userValidator,verifyLogin,login)

//修改密码接口
router.post('/',auth,cryptPassword,changePassword)

router.post('/changeAvatar',auth,changeAvatar)
router.post('/changeUserName',auth,verifyUser,changeUserName)


// 获取用户信息
router.get("/info", auth, (ctx) => {
  ctx.body = {
    code: 0,
    message: "获取用户信息成功",
    result: ctx.state.user,
  };
});
module.exports = router