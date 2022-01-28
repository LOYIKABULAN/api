// @ts-nocheck
const {  publishGoodsError} = require("../constants/err.type");
const { upload } = require("../utils/upload");
const { createGoods} =require('../service/goods.service')
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async uploadImg(ctx, next) {
    upload(ctx, next, ["image/jpeg", "image/png"]);
  }
  async create(ctx) {
    //之间调用service 的createGoods方法
    try {
      const {createdAt,updatedAt,...res} =  await createGoods(ctx.request.body);
      ctx.body={
        code:0,
        message:'发布商品成功',
        result:res
      }
    } catch (error) {
      console.error('发布商品出错',error);
      return ctx.app.emit('error',publishGoodsError,ctx)
    }
  }
}

module.exports = new GoodController();
