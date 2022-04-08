// @ts-nocheck
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
  getAllUser,
} = require("../service/user.service");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
  async register(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;

    //2.操作数据库
    try {
      const res = await createUser(user_name, password);
      //3. 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.log(error, "注册错误");
    }
  }
  async createUser(ctx, next) {
    //1.获取数据
    const { user_name, password = 123456, is_admin, roles } = ctx.request.body;

    //2.操作数据库
    try {
      const res = await createUser(user_name, password, is_admin, roles);
      //3. 返回结果
      ctx.body = {
        code: 0,
        message: "创建用户成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.log(error, "创建用户错误");
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    //1.获取用户信息（在token的payload中，记录id，user_name,is_admin）
    try {
      //从返回结果对象中提出password属性，将剩下的属性放到res新的对象中
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (error) {
      console.error("登录失败", error);
    }
  }
  async changePassword(ctx, next) {
    //1.获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    //2.操作数据库
    //3.返回结束
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10007,
        message: "修改密码失败",
        result: "",
      };
    }
  }
  async changeAvatar(ctx) {
    //1.获取数据
    const id = ctx.state.user.id;
    const avatar = ctx.request.body.avatar;
    //2.操作数据库
    //3.返回结束
    if (await updateById({ id, avatar })) {
      ctx.body = {
        code: 0,
        message: "修改头像成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10010,
        message: "修改头像失败",
        result: "",
      };
    }
  }
  async changeUserName(ctx) {
    //1.获取数据
    const id = ctx.state.user.id;
    const user_name = ctx.request.body.user_name;
    //2.操作数据库
    //3.返回结束
    if (await updateById({ id, user_name })) {
      ctx.body = {
        code: 0,
        message: "修改用户名成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10011,
        message: "修改用户名失败",
        result: "",
      };
    }
  }
  async changePower(ctx) {
    //1.获取数据
    const {id,is_admin,roles} = ctx.request.body;
    //2.操作数据库
    //3.返回结束
    if (await updateById({ id, is_admin,roles })) {
      ctx.body = {
        code: 0,
        message: "修改权限成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10011,
        message: "修改权限失败",
        result: "",
      };
    }
  }
  async userInfo(ctx) {
    const id = ctx.query.id;
    if (id) {
      const res = await getUserInfo({ id });
      return (ctx.body = {
        code: 0,
        message: "获取用户信息成功",
        result: res,
      });
    }
    return (ctx.body = {
      code: 0,
      message: "获取用户信息成功1",
      result: ctx.state.user,
    });
  }
  async getUser(ctx) {
    try {
      const { pageNum = 1, pageSize = 10 } = ctx.request.query;
      const res = await getAllUser({ pageNum,pageSize });
      return ctx.body = {
        code: 0,
        message: "获取用户信息成功",
        result: res,
      };
    } catch (error) {
      console.error(error,'查找用户');
      return ctx.body = {
        code: 12202,
        message: "查找用户失败",
        result: res,
      };
    }
  }
}
module.exports = new UserController();
