// @ts-nocheck
const { Op, where } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");
class CartService {
  async createOrUpdate(user_id, goods_id) {
    //根据user_id和goods_id同时查有没有记录
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });

    if (res) {
      //存在记录,将number加一
      await res.increment("number", { by: 1 });
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }
  async findCarts({ id, pageNum, pageSize }) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      where: { user_id: id },
      attributes: ["id", "number", "selected"],
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_image"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async updateCarts({ id, number, selected }) {
    //findByPk 方法使用提供的主键从表中仅获得一个条目.
    const res = await Cart.findByPk(id);
    console.log(res);
    if (!res) return "";

    number !== undefined ? (res.number = number) : "";

    if (selected !== undefined) {
      res.selected = selected;
    }
    return await res.save();
  }
  async removeCart(ids) {
    Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
  async selectAllGoods(user_id, select) {
    if (select) {
      return await Cart.update({ selected: true }, { where: { user_id } });
    }
    else{
      return await Cart.update({ selected: false }, { where: { user_id } });
    }
  }
}
module.exports = new CartService();
