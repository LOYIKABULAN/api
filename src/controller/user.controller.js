// @ts-nocheck
const jwt = require('jsonwebtoken')
const { createUser, getUserInfo ,updateById} = require("../service/user.service");
const {JWT_SECRET} = require ('../config/config.default')
class UserController {
  async register(ctx, next) {
    //1.获取数据
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;

    //2.操作数据库
    try {
      const res = await createUser(user_name, password);
      console.log(res);
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
      console.log(error);
    }
  }
  async login(ctx, next) {
    const {user_name} = ctx.request.body;
    //1.获取用户信息（在token的payload中，记录id，user_name,is_admin）
    try {
      //从返回结果对象中提出password属性，将剩下的属性放到res新的对象中
      const {password,...res}  = await getUserInfo({user_name})
      ctx.body={
        code:'0',
        message:'用户登录成功',
        result:{
          token:jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
        }
      }
    } catch (error) {
      console.error('登录失败',error);
    }
  }
  async changePassword(ctx,next){
    //1.获取数据
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    // console.log(id,password);
    //2.操作数据库
    //3.返回结束
   if (await updateById({id,password})) {
     ctx.body = {
       code:0,
       message:'修改密码成功',
       result:''
     }
   }else{
    ctx.body = {
      code:10007,
      message:'修改密码失败',
      result:''
    }
   }
  }
}
module.exports = new UserController();
