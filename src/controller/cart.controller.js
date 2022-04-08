const { cartFormateError } = require('../constants/err.type');
const {createOrUpdate,findCarts,updateCarts,removeCart,selectAllGoods} =require('../service/cart.service')

class CartController {
  async add(ctx) {
    //将商品添加到购物车
    //1. 解析user_id，goods_id
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    //2. 操作数据库
    const res = await createOrUpdate(user_id,goods_id)
    //3. 返回结果
    ctx.body = {
        code:0,
        message:'添加到购物车成功',
        result:res
    }
  }
  async findAll(ctx){
    //1. 解析请求参数
    const {pageNum = 1,pageSize=10} = ctx.request.query
    const {id} = ctx.state.user
    //2. 操作数据库
    const res = await findCarts({id,pageNum,pageSize})
    //3. 返回结果
    ctx.body = {
      code:0,
      message:'获取购物车列表成功',
      result:res
    }
  }
  async update(ctx){
    //1. 解析参数
    const {id} = ctx.request.params
    const {number,selected}= ctx.request.body
    if (number === undefined && selected === undefined) {
      cartFormateError.message = 'number和selected不能同时为空'
      return ctx.app.emit('error',cartFormateError,ctx)
      
    }
    //2. 操作数据库
    const res = await updateCarts({id,number,selected})
    //3. 返回数据
     ctx.body={
      code:0,
      message:'更新购物车成功',
      result:res
    }
  }
  async remove(ctx){
    const {ids} = ctx.request.body
    const res = await removeCart(ids)
    ctx.body = {
      code:0,
      message:'删除购物车成功',
      result:''
    }
  }
  async selectAll(ctx){
    const {id} = ctx.state.user;
    const {select}=ctx.request.body
    const res = await selectAllGoods(id,select);
    ctx.body = {
      code: 0,
      message:select ? '全部选中':'取消全选',
      result:res
    }
  }
  
}

module.exports = new CartController();
