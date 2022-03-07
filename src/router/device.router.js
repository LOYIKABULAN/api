const Router = require("koa-router");
const router = new Router({ prefix: "/device" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {create,findAll,deleted,update} = require('../controller/device.controller');

router.post('/create',auth,create)

router.get('/getDevice',auth,hadAdminPermission,findAll)
router.get('/getDeviceUser',auth,findAll)

router.delete('/:id',auth,hadAdminPermission,deleted)

router.patch('/:id',auth,hadAdminPermission,update)
module.exports = router