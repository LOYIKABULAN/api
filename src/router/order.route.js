const Router = require("koa-router");
const router = new Router({ prefix: "/orders" });
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/order.middleware");
const { create,findAll,update,findAllSale} = require("../controller/order.constroller");
//提交订单
router.post(
  "/",
  auth,
  validator({
    address_id: "int",
    goods_info: "string",
    total: "string",
    salesman_id:"int"
  }),
  create
);
// 获取订单
router.get('/',auth,findAll)
router.get('/sale',auth,findAllSale)
//更新订单
router.post('/:id',auth,validator({
  states:'number'
}),update)
module.exports = router;
