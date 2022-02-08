const {invalidGoodsId}=require('../constants/err.type')
const validator = async (ctx,next) =>{
    try {
        ctx.verifyParams({
            goods_id:'number'
        })
    } catch (error) {
        console.error(error);
        invalidGoodsId.result = error
        return ctx.app.emit('error',invalidGoodsId,ctx)
    }
    return next()
}

module.exports = {
    validator,
}