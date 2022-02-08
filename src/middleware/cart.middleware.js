const { cartFormateError } = require("../constants/err.type");
// const validator = async (ctx,next) =>{
//     try {
//         ctx.verifyParams({
//             goods_id:'number'
//         })
//     } catch (error) {
//         console.error(error);
//         invalidGoodsId.result = error
//         return ctx.app.emit('error',invalidGoodsId,ctx)
//     }
//     return next()
// }
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error(error);
      cartFormateError.result = error;
      return ctx.app.emit("error", cartFormateError, ctx);
    }
    return next();
  };
};

module.exports = {
  validator,
};
