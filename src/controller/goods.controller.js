// @ts-nocheck
const {
  publishGoodsError,
  updateGoodsError,
  invalidGoodsId,
  deleteGoodsError,
  restoreGoodsError,
  findGoodsParamsError,
} = require("../constants/err.type");
const { upload } = require("../utils/upload");
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = require("../service/goods.service");
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
  async state(ctx) {
    console.log(ctx.request.body);
    if (ctx.request.body.is_deleted) {
      try {
        const res = await removeGoods(ctx.params.id);
        if (res) {
          ctx.body = {
            code: 0,
            message: "下架商品成功",
            result: "",
          };
        } else {
          return ctx.app.emit("error", invalidGoodsId, ctx);
        }
      } catch (error) {
        console.error(error);
        return ctx.app.emit("error", deleteGoodsError, ctx);
      }
    } else {
      try {
        const res = await restoreGoods(ctx.params.id);
        if (res) {
          ctx.body = {
            code: 0,
            message: "上架商品成功",
            result: "",
          };
        } else {
          return ctx.app.emit("error", invalidGoodsId, ctx);
        }
      } catch (error) {
        console.error(error);
        return ctx.app.emit("error", restoreGoodsError, ctx);
      }
    }
  }
  async restore(ctx) {}
  async findAll(ctx) {
    try {
      // 1.解析pageNum和pageSize
      const { pageNum = 1, pageSize = 10 } = ctx.request.query;
      // 2.调用数据处理的相关方法
      const res = await findGoods(pageNum, pageSize);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: "获取商品列表成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", findGoodsParamsError, ctx);
    }
  }
}

module.exports = new GoodController();
