// @ts-nocheck
const Goods = require("../model/goods.model");
const User = require("../model/user.model");
class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } ,paranoid: false});

    return res[0] > 0 ? true : false;
  }
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } });
    // console.log(res);
    return res > 0 ? true : false;
  }
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } });
    return res > 0 ? true : false;
  }
  async findGoods(pageNum, pageSize,searchAll) {
    //1.获取总数
    // const count = await Goods.count();
    // console.log(count);
    //2.获取分页的具体数据
    // try {
    //   const offset = (pageNum - 1) * pageSize;
    //   const rows = await Goods.findAll({ offset, limit: pageSize * 1 });
    //   return {
    //       pageNum,
    //       pageSize,
    //       total:count,
    //       list:rows
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: pageSize * 1,
      paranoid: searchAll,
      include:{
        model: User,
        as:'user_info',
        attributes:['user_name',"avatar"]

      }
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new GoodsService();
