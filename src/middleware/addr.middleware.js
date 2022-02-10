const { addrFormateError } = require("../constants/err.type");
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      await ctx.verifyParams(rules);
    } catch (error) {
      console.error(error);
      addrFormateError.result = error
      return ctx.app.emit("error", addrFormateError, ctx);
    }
    await next();
  };
};

module.exports = {
  validator,
};
