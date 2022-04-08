// @ts-nocheck
const User = require("../model/user.model");
class UserService {
  async createUser(user_name, password,is_admin,roles) {
    if (is_admin||roles) {
      
    const res = await User.create({ user_name, password,is_admin,roles }); //可以使用try catch 来解决报错
    return res.dataValues;

    }
    // 写入数据库
    const res = await User.create({ user_name, password }); //可以使用try catch 来解决报错
    return res.dataValues;
  }
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin","avatar","roles"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
  async updateById({ id, user_name, password, is_admin,avatar,roles}) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser,{ user_name });
    password && Object.assign(newUser,{ password });
    is_admin!==undefined && Object.assign(newUser,{ is_admin });
    roles && Object.assign(newUser,{ roles });
    avatar && Object.assign(newUser,{ avatar });
    console.log(whereOpt,newUser);
    try {
    const res = await User.update( newUser ,{where: whereOpt,});
    return res[0] > 0 ? true:false
      
    } catch (error) {
      console.log(error,'修改错误');
    }
  }
  async getAllUser({pageNum,pageSize}){
    const { count, rows } = await User.findAndCountAll({
      order:[
        ['id','DESC']
      ],
      offset: (pageNum - 1) * pageSize, //跳过实例数量
      limit: pageSize * 1, //获取实例数量
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new UserService();
