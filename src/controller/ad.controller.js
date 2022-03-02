const {createAd,findAdvertisements,deleteAd,updateAd} = require('../service/ad.service')
const {deleteAdError} = require('../constants/err.type')
class adController {
    async create(ctx){
        const params = ctx.request.body
        const res = await createAd(params)
        ctx.body = {
            code:0,
            message:'广告添加成功',
            result:res
            
        }
    }
    async findAll(ctx){
        // const {spaceId} = ctx.request.query
        const res = await findAdvertisements(1)
        console.log(res);
        ctx.body = {
            code:0,
            message:'获取列表成功',
            result:res
        }
    }
    async deleted(ctx){
        const id = ctx.request.params.id
        const res = await deleteAd(id)
        console.log(res);
        if (res) {
            ctx.body = {
                code :0,
                message:'删除成功',
                result:''
            }
            return
        }
       
        return ctx.app.emit("error", deleteAdError, ctx);
    }
    async update(ctx){
        const id = ctx.request.params.id
        const params = ctx.request.body
        const res = await updateAd(id,params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'更新成功',
            result:res
        }
    }
}

module.exports = new adController()