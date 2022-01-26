class GoodController {
    //upload其实可以作为工具单独工具上传多种文件
    async upload(ctx,next){
        ctx.body = {
            message:'商品图片上传成功'
        }
    }
}

module.exports = new GoodController()