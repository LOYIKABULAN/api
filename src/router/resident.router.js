const Router = require("koa-router");
const router = new Router({ prefix: "/resident" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {create,findAll,deleted,update} = require('../controller/resident.controller');

router.post('/create',auth,create)

router.get('/getResident',auth,hadAdminPermission,findAll({is_user:false}))

router.get('/getResidentUser',auth,findAll({is_user:true}))

router.delete('/:id',auth,hadAdminPermission,deleted)

router.patch('/:id',auth,hadAdminPermission,update)
module.exports = router