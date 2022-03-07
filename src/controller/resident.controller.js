const {createResident,findResident,deleteResident,updateResident} = require('../service/resident.service')
const {deleteResidentError} = require('../constants/err.type')



class ResidentController {
    async create(ctx){
        let params = Object.assign(ctx.request.body,{user_id:ctx.state.user.id})
        const res = await createResident(params)
        ctx.body = {
            code:0,
            message:'住户信息添加成功',
            result: res
            
        }
    }
     findAll({is_user=false}){
        return async(ctx)=>{
            // 1.解析pageNum和pageSize
            const { pageNum = 1, pageSize = 10 } = ctx.request.query;
            const user_id  = ctx.state.user.id
            // 2.调用数据处理的相关方法
            const res = await findResident({pageNum, pageSize,user_id,is_user});
            // 3. 返回结果
            ctx.body = {
              code: 0,
              message: "获取列表成功",
              result: res,
            };
        }
    }
    async deleted(ctx){
        const id = ctx.request.params.id
        const res = await deleteResident(id)
        console.log(res);
        if (res) {
            ctx.body = {
                code :0,
                message:'删除成功',
                result:''
            }
            return
        }
       
        return ctx.app.emit("error", deleteResidentError, ctx);
    }
    async update(ctx){
        const id = ctx.request.params.id
        const params = ctx.request.body
        const res = await updateResident(id,params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'更新成功',
            result:res
        }
    }
}

module.exports = new ResidentController()