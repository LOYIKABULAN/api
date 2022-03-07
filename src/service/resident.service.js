const resident = require("../model/resident.model");
class newsService {
  async createResident(params) {
    return resident.create(params);
  }
  async findResident({ pageNum, pageSize, user_id, is_user }) {
    console.log(user_id, is_user);
    if (is_user) {
      const offset = (pageNum - 1) * pageSize;
      const { count, rows } = await resident.findAndCountAll({
        offset,
        limit: pageSize * 1,
        where: {
          user_id,
        },
      });
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    }else{
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await resident.findAndCountAll({
          offset,
          limit: pageSize * 1,
        });
        return {
          pageNum,
          pageSize,
          total: count,
          list: rows,
        };
    }
  }
  async deleteResident(id) {
    return resident.destroy({
      where: {
        id,
      },
    });
  }
  async updateResident(id, params) {
    const res = await resident.update(params, { where: { id } });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new newsService();
