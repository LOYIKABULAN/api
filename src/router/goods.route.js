const Router =require('koa-router')

const router = new Router({prefix:'/goods'});

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')

const {uploadImg} = require('../controller/goods.controller')

router.post('/upload',auth,hadAdminPermission,uploadImg)
// router.post('/upload',uploadImg)
module.exports = router