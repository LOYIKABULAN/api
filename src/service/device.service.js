const device = require("../model/device.model");
class deviceService {
  async createDevice(params) {
    console.log(params);
    try {
     return await device.create(params);
      
    } catch (error) {
      console.log(error);
    }
  }
  async findDevice({pageNum,pageSize},is_admin,user_id) {
    if (is_admin) {
      const offset = (pageNum - 1) * pageSize;
      const { count, rows } = await device.findAndCountAll({
        offset,
        limit: pageSize * 1,
      });
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    }else{
      const offset = (pageNum - 1) * pageSize;
      const { count, rows } = await device.findAndCountAll({
        offset,
        limit: pageSize * 1,
        where:{
          user_id
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
  async deleteDevice(id) {
    return device.destroy({
      where: {
        id,
      },
    });
  }
  async updateDevice(id, params) {
    const res = await device.update(params, { where: { id } });
    return res[0] > 0 ? true : false;

  }
}

module.exports = new deviceService();
