const path = require("path");
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ['image/jpeg','image/png']
    if (file) {
      
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error',unSupportFileType,ctx)
      }
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.path),
        },
      };
    }else{
        return ctx.app.emit('error',fileUploadError,ctx)
    }
  }
}

module.exports = new GoodController();
