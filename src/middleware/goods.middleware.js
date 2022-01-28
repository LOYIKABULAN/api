const validator = async (ctx, next) => {
  const { goodFormatError } = require("../constants/err.type");
  try {
    ctx.verifyParams({
      goods_name: { type: "string", required: true },
      goods_price: { type: "number", required: true },
      goods_num: { type: "number", required: true },
      goods_image: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    goodFormatError.result = err.errors;
    return ctx.app.emit("error", goodFormatError, ctx);
  }
  await next();
};

module.exports = {
  validator,
};
