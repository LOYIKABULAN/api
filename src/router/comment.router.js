const Router = require("koa-router");
const router = new Router({ prefix: "/comment" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')

const {create,findAll,deleted} = require('../controller/comment.controller');

router.post('/',auth,create)

router.get('/',auth,findAll)

router.delete('/:id',auth,deleted)


module.exports = router