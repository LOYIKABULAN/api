const order = require("../model/order.model");
class orderService {
  async createOrder(params) {
    return await order.create(params);
  }
  async findAllOrder({ pageNum, pageSize, states }) {
    const { count, rows } = await order.findAndCountAll({
      attributes: ["goods_info", "total", "order_number", "states"],
      where: {
        states,
      },
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
    console.log("hh");
    return await order.update({ states }, { where: { id } });
  }
}

module.exports = new orderService();
