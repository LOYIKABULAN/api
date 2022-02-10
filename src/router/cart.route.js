//1. 导入koa-router
const Router = require("koa-router");

//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
//控制器
const {
  add,
  findAll,
  update,
  remove,
  selectAll,
} = require("../controller/cart.controller");

//2. 实例化router对象
const router = new Router({ prefix: "/carts" });
//3. 编写路由规则
//TODO3.1登录校验，格式添加到购物车，（判断商品上下架状态，判断是否可以添加到购物车）
router.post("/", auth, validator({ goods_id: "number" }), add);
//TODO3.2获取购物车列表，（应当获取当前上下架状态）
router.get("/", auth, findAll);
//TODO3.3 更新购物车 （用户是否有权修改该购物车）
router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

//TODO3.4 删除购物车（还未判断购物车商品是否存在)
router.delete("/", auth, validator({ ids: "array" }), remove);

//3.5 全选
router.post("/selectAll", auth,validator({select:'boolean'}), selectAll);
//4. 到处路由对象
module.exports = router;
