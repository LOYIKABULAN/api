//1. 导入koa-router
const Router = require("koa-router");

//中间件\控制器
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/addr.middleware");
const { create ,findAll} = require("../controller/addr.controller");
//2. 实例化koa-router
const router = new Router({ prefix: "/address" });
//3. 编写路由规则
//3.1添加地址接口(validator还可以统一封装)
router.post(
  "/",
  auth,
  validator({
    consignee: "string",
    phone: {
      type: "string",
      format: /^1\d{10}$/,
    },
    address: "string",
  }),
  create
);
//3.2获取地址列表
router.get('/',auth,findAll)

//4. 导出路由
module.exports = router;
