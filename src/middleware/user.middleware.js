// @ts-nocheck
const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExisted,
} = require("../constants/err.type");
const userValidator = async (ctx, next) => {
  let { user_name, password } = ctx.request.body;
  //（1）合法性
  if (!user_name || !password) {
    console.error("用户名密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};
const verifyUser = async (ctx, next) => {
  let { user_name } = ctx.request.body;
  //（2）合理性
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户已存在", { user_name }, ctx.request.body);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.log(error, "获取用户信息错误");
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
};
