//1. 导入koa-router
const Router = require("koa-router");

//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
//控制器
const { add, findAll ,update,remove } = require("../controller/cart.controller");

//2. 实例化router对象
const router = new Router({ prefix: "/carts" });
//3. 编写路由规则
//3.1登录校验，格式添加到购物车，（判断商品上下架状态，判断是否可以添加到购物车）
router.post("/", auth, validator({ goods_id: "number" }), add);
//3.2获取购物车列表，（应当获取当前上下架状态）
router.get("/", auth, findAll);
//3.3 更新购物车 （用户是否有权修改该购物车）
router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

//3.4 删除购物车（还未判断购物车商品是否存在)

router.delete('/',auth,validator({ids:'array'}),remove)

//4. 到处路由对象
module.exports = router;
