// @ts-ignore
const jwt = require("jsonwebtoken");
const {hasNotAdminPermission} =require('../constants/err.type')
// @ts-ignore
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,jsonWebTokenError } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization='' } = ctx.request.header;
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

const hadAdminPermission = async (ctx,next) =>{
  const {is_admin} = ctx.state.user
  if (!is_admin) {
    console.error('该用户没有管理员权限',ctx.state.user);
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }
  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
};
