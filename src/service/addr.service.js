// @ts-nocheck
const Address = require("../model/addr.model");
class addrService {
  async createAddr(params) {
    return await Address.create(params);
  }
  async findAllAddr({user_id,id}) {
    let whereObj = {user_id}
    id && Object.assign(whereObj,{id:id*1})
    return await Address.findAll({
      attributes: ["id", "consignee", "phone", "address", "is_default"],
      where:whereObj,
    });
  }
  async updateAddr(id, addr) {
    return await Address.update(addr, { where: { id } });
  }
  async removeAddr(id) {
    return await Address.destroy({
      where: {
        id,
      },
    });
  }
  async setDefaultAddr({ id, user_id }) {
    await Address.update({ is_default: false }, { where: { user_id } });
    return await Address.update(
      { is_default: true },
      {
        where: {
          user_id,
          id,
        },
      }
    );
  }
}

module.exports = new addrService();
