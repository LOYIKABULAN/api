const {clickLike,findAllLike} = require('../service/like.service')
class LikeController {
    async like(ctx){
        const user_id = ctx.state.user.id
        let params = ctx.request.body
        Object.assign(params,{user_id})
        try {
            const res = await clickLike(params)
            ctx.body = {
                code:0,
                message:'操作成功',
                result: res
                
            }
        } catch (error) {
            ctx.body = {
                code:12202,
                message:'操作失败',
                result:error
            }
        }
       
    }
    async findAll(ctx){
        let params = ctx.request.query
        const user_id =ctx.state.user.id
        const res = await findAllLike(params,user_id)
        ctx.body = {
            code:0,
            message:'操作成功',
            result: res
            
        }
    }
}

module.exports = new LikeController()