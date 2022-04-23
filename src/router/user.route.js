// @ts-nocheck
const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const {register,login,changePassword,changeAvatar,changeUserName,userInfo,createUser,getUser,changePower,deleteUser} =require('../controller/user.controller')
const {userValidator,verifyUser,cryptPassword,verifyLogin} =require('../middleware/user.middleware')
const {auth, hadAdminPermission} =require('../middleware/auth.middleware')

//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//创建用户接口
router.post('/createUser',auth,hadAdminPermission,userValidator,verifyUser,cryptPassword,createUser)

//登录接口
router.post('/login',userValidator,verifyLogin,login)

//修改密码接口
router.post('/',auth,cryptPassword,changePassword)

router.post('/changeAvatar',auth,changeAvatar)
router.post('/changeUserName',auth,verifyUser,changeUserName)


// 获取用户信息
router.get("/info", auth,userInfo);

// getAllUser
router.get("/getAllUser",auth,hadAdminPermission,getUser)

//更改用户权限角色
router.patch("/userPower",auth,hadAdminPermission,changePower)
router.delete("/:id",auth,hadAdminPermission,deleteUser)

module.exports = router