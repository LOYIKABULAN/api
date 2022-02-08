// @ts-nocheck
const path = require("path");
const fs = require('fs')
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
module.exports = {
  async upload(ctx, next, fileType) {
    const { file } = ctx.request.files;
    const fileTypes = fileType;
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit("error", unSupportFileType, ctx);
      }
      const reader = fs.createReadStream(file.path);
      let filePath =
        path.join(__dirname, "../upload") + `/${path.basename(file.path)}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      ctx.body = {
        code: 0,
        message: "上传成功",
        result: {
          goods_img: path.basename(filePath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  },
};
