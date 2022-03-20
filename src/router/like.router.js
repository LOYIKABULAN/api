const Router = require("koa-router");
const router = new Router({ prefix: "/like" });

const {auth,hadAdminPermission} = require('../middleware/auth.middleware')

const {like,findAll} = require('../controller/like.controller')

router.post('/',auth,like)
router.get('/',auth,findAll)


module.exports = router