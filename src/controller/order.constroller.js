const {createOrder ,findAllOrder} = require('../service/order.service')
class orderController {
    async create(ctx){
        const user_id = ctx.state.user.id
        const {address_id,goods_info,total} = ctx.request.body
        const order_number = "zd"+Date.now()
        const res = await createOrder({user_id,address_id,goods_info,total,order_number})
        ctx.body={
            code:0,
            message:'生成订单成功',
            result:res
        }
    }
    async findAll(ctx){
        const {pageNum=1,pageSize=10,states=0} = ctx.request.query
        const res =await findAllOrder({pageNum,pageSize,states})
        ctx.body = {
            code:0,
            message:'查找成功',
            result:res
        }
    }
}

module.exports  = new orderController()