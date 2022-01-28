const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");

const { uploadImg } = require("../controller/goods.controller");
const { validator } = require("../middleware/goods.middleware");
//商品图片上传接口
router.post("/upload", auth, hadAdminPermission, uploadImg);
// router.post('/upload',uploadImg)

//发布商品接口
router.post("/", auth, hadAdminPermission, validator,(ctx,next)=>{
    ctx.body = '发布商品成功'
});

module.exports = router;
