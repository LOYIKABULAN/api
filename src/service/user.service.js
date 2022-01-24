// @ts-nocheck
const User = require("../model/user.model");
class UserService {
  async createUser(user_name, password) {
    // TODO:写入数据库
    const res =await User.create({user_name, password});//可以使用try catch 来解决报错
    // console.log(res);
    return res.dataValues;
  }
}

module.exports = new UserService();
