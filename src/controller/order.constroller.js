const {createOrder ,findAllOrder,updateOrder,findAllSaleOrder} = require('../service/order.service')
class orderController {
    async create(ctx){
        try {
            const user_id = ctx.state.user.id
            const {address_id,goods_info,total,salesman_id} = ctx.request.body
            const order_number = "zd"+Date.now()
            const res = await createOrder({user_id,address_id,goods_info,total,order_number,salesman_id})
            ctx.body={
                code:0,
                message:'生成订单成功',
                result:res
            }
        } catch (error) {
            console.error(error)
        }
       
    }
    async findAll(ctx){
        const {pageNum=1,pageSize=10,} = ctx.request.query
        const user_id = ctx.state.user.id;
        const res =await findAllOrder({pageNum,pageSize,user_id})
        ctx.body = {
            code:0,
            message:'查找成功',
            result:res
        }
    }
    async findAllSale(ctx){
        const user_id = ctx.state.user.id;
        const {pageNum=1,pageSize=10} = ctx.request.query
        const res =await findAllSaleOrder({pageNum,pageSize,user_id})
        ctx.body = {
            code:0,
            message:'查找成功',
            result:res
        }
    }
    async update(ctx){
        const id = ctx.request.params.id
        const {states} = ctx.request.body
        const res = await updateOrder(id,states)

        ctx.body = {
            code:0,
            message:'修改成功',
            result:res
        }
    }
}

module.exports  = new orderController()