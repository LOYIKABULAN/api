// @ts-nocheck
const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");

const {
  uploadImg,
  create,
  update,
  state,
  findAll,
  findMyAll
} = require("../controller/goods.controller");
const { validator } = require("../middleware/goods.middleware");
//商品图片上传接口
router.post("/upload", auth, hadAdminPermission, uploadImg);
// router.post('/upload',uploadImg)

//发布商品接口
router.post("/", auth, validator, create);

//修改商品接口
router.put("/:id", auth, hadAdminPermission, validator, update);

//?不推荐
//硬删除接口
// router.delete("/:id", auth, hadAdminPermission, remove);


//软删除接口
//商品上下架
router.post('/:id/state',auth,hadAdminPermission,state)

//获取商品列表

router.get('/',auth,hadAdminPermission,findAll({searchAll:false}))//获取所有包括下架商品
router.get('/feeds',findAll({searchAll:true}))

router.get('/feedsPersonal',auth,findMyAll)

module.exports = router;
