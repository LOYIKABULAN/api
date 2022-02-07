// @ts-nocheck
const {
  publishGoodsError,
  updateGoodsError,
  invalidGoodsId,
} = require("../constants/err.type");
const { upload } = require("../utils/upload");
const { createGoods ,updateGoods ,removeGoods} = require("../service/goods.service");
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async uploadImg(ctx, next) {
    upload(ctx, next, ["image/jpeg", "image/png"]);
  }
  async create(ctx) {
    //之间调用service 的createGoods方法
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: "发布商品成功",
        result: res,
      };
    } catch (error) {
      console.error("发布商品出错", error);
      return ctx.app.emit("error", publishGoodsError, ctx);
    }
  }
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改商品成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", updateGoodsError, ctx);
    }
  }
  async remove(ctx) {
    await removeGoods (ctx.params.id)
    ctx.body = {
      code:0,
      message:'删除商品成功',
      result:''
    }
  }
}

module.exports = new GoodController();
