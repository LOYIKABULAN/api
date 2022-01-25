// @ts-nocheck
const { getUserInfo } = require("../service/user.service");
const bcrypt = require("bcryptjs");
const {
  userFormateError,
  userAlreadyExisted,
  userNotExist,
  userLoginError,
  invalidPassword,
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
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  //hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;
  await next();
};
const verifyLogin = async (ctx, next) => {
  //1.判断用户是否存在（不存在报错）
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error('用户不存在',{user_name});
      ctx.app.emit('error',userNotExist,ctx)
      return;
    }


    //2.找到用户后匹配密码是否正确（不匹配报错）
    if (!bcrypt.compareSync(password,res.password)) {
      console.error();
      ctx.app.emit('error',invalidPassword,ctx)
      return;
    }
  } catch (error) {
    console.error('用户登录错误');
    ctx.app.emit('error',userLoginError,ctx)
    return;
  }

  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
