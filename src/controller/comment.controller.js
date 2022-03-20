const {createComment,findComment,deleteComment,updateComment} = require('../service/comment.service')
// const {deleteCommentError} = require('../constants/err.type')
class CommentController {
    async create(ctx){
        const params = ctx.request.body
        const res = await createComment(params)
        ctx.body = {
            code:0,
            message:'成功',
            result: res
            
        }
    }
    async findAll(ctx){
         // 1.解析pageNum和pageSize
         const { pageNum = 1, pageSize = 10 ,goods_id} = ctx.request.query;
         // 2.调用数据处理的相关方法
         const res = await findComment({pageNum, pageSize,goods_id});
         // 3. 返回结果
         ctx.body = {
           code: 0,
           message: "获取列表成功",
           result: res,
         };
    }
    async deleted(ctx){

        const id = ctx.request.params.id
        try {
            const res = await deleteComment(id)
            if (res) {
                ctx.body = {
                    code :0,
                    message:'删除成功',
                    result:''
                }
                return
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code :12202,
                message:'错误',
                result:'WHERE parameter "id" has invalid "undefined" value'
            }
        }
       
       
        // return ctx.app.emit("error", deleteCommentError, ctx);
    }
    async update(ctx){
        const id = ctx.request.params.id
        const params = ctx.request.body
        const res = await updateComment(id,params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'更新成功',
            result:res
        }
    }
}

module.exports = new CommentController()