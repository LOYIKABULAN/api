const order = require("../model/order.model");
const Address = require("../model/addr.model");
const User = require("../model/user.model");

class orderService {
  async createOrder(params) {
    return await order.create(params);
  }
  async findAllOrder({ pageNum, pageSize,user_id }) {
    const { count, rows } = await order.findAndCountAll({
      where: {
        user_id,
      },
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
  async findAllSaleOrder({ pageNum, pageSize,user_id }){
    const { count, rows } = await order.findAndCountAll({
      where: {
        salesman_id:user_id,
      },
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
  async updateOrder(id, states) {
    return await order.update({ states }, { where: { id } });
  }
}

module.exports = new orderService();
