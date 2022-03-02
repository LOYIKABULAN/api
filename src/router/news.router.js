const Router = require("koa-router");
const router = new Router({ prefix: "/news" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {create,findAll,deleted,update} = require('../controller/news.controller');

router.post('/create',auth,hadAdminPermission,create)

router.get('/getNews',findAll)

router.delete('/:id',auth,hadAdminPermission,deleted)

router.patch('/:id',auth,hadAdminPermission,update)
module.exports = router