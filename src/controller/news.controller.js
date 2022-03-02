const {createNews,findNews,deleteNews,updateNews} = require('../service/news.service')
const {deleteNewsError} = require('../constants/err.type')
class NewsController {
    async create(ctx){
        const params = ctx.request.body
        const res = await createNews(params)
        ctx.body = {
            code:0,
            message:'新闻添加成功',
            result: res
            
        }
    }
    async findAll(ctx){
         // 1.解析pageNum和pageSize
         const { pageNum = 1, pageSize = 10 } = ctx.request.query;
         // 2.调用数据处理的相关方法
         const res = await findNews({pageNum, pageSize});
         // 3. 返回结果
         ctx.body = {
           code: 0,
           message: "获取列表成功",
           result: res,
         };
    }
    async deleted(ctx){
        const id = ctx.request.params.id
        const res = await deleteNews(id)
        console.log(res);
        if (res) {
            ctx.body = {
                code :0,
                message:'删除成功',
                result:''
            }
            return
        }
       
        return ctx.app.emit("error", deleteNewsError, ctx);
    }
    async update(ctx){
        const id = ctx.request.params.id
        const params = ctx.request.body
        const res = await updateNews(id,params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'更新成功',
            result:res
        }
    }
}

module.exports = new NewsController()