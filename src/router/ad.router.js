const Router = require("koa-router");
const router = new Router({ prefix: "/advertisement" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {create,findAll,deleted,update} = require('../controller/ad.controller');

router.post('/create',auth,hadAdminPermission,create)

router.get('/getAd',findAll)

router.delete('/:id',auth,hadAdminPermission,deleted)

router.patch('/:id',auth,hadAdminPermission,update)
module.exports = router