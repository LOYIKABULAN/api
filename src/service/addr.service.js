// @ts-nocheck
const Address = require("../model/addr.model");
class addrService {
  async createAddr(params) {
    return await Address.create(params);
  }
}

module.exports = new addrService();
