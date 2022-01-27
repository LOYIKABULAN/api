// @ts-nocheck
const path = require("path");
const fs = require('fs')
const {fileUploadError,unSupportFileType} = require('../constants/err.type')
const {upload} = require('../utils/upload')
class GoodController {
  //upload其实可以作为工具单独工具上传多种文件
  async uploadImg(ctx, next) {
    upload(ctx,next,["image/jpeg", "image/png"])
  }
}

module.exports = new GoodController();
