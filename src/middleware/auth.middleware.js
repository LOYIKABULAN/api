// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,jsonWebTokenError } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token失效", error);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("token无效", error);
        return ctx.app.emit("error", jsonWebTokenError, ctx);
    }
  }

  await next();
};

module.exports = {
  auth,
};
