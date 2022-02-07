// @ts-nocheck
const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");

const {
  uploadImg,
  create,
  update,
  remove,
} = require("../controller/goods.controller");
const { validator } = require("../middleware/goods.middleware");
//商品图片上传接口
router.post("/upload", auth, hadAdminPermission, uploadImg);
// router.post('/upload',uploadImg)

//发布商品接口
router.post("/", auth, hadAdminPermission, validator, create);

//修改商品接口
router.put("/:id", auth, hadAdminPermission, validator, update);

//硬删除接口
router.delete("/:id", auth, hadAdminPermission, remove);
module.exports = router;
