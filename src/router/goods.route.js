// @ts-nocheck
const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");

const {
  uploadImg,
  create,
  update,
  remove,
  restore,
} = require("../controller/goods.controller");
const { validator } = require("../middleware/goods.middleware");
//商品图片上传接口
router.post("/upload", auth, hadAdminPermission, uploadImg);
// router.post('/upload',uploadImg)

//发布商品接口
router.post("/", auth, hadAdminPermission, validator, create);

//修改商品接口
router.put("/:id", auth, hadAdminPermission, validator, update);

//?不推荐
//硬删除接口
// router.delete("/:id", auth, hadAdminPermission, remove);


//软删除接口
router.post('/:id/off',auth,hadAdminPermission,remove)
//商品上架
router.post('/:id/on',auth,hadAdminPermission,restore)

module.exports = router;
