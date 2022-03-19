const news = require("../model/news.model");
class newsService {
  async createNews(params) {
    return news.create(params);
  }
  async findNews({pageNum,pageSize}) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await news.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order:[
        ['id','DESC']
      ]
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async deleteNews(id) {
    return news.destroy({
      where: {
        id,
      },
    });
  }
  async updateNews(id, params) {
    const res = await news.update(params, { where: { id } });
    return res[0] > 0 ? true : false;

  }
}

module.exports = new newsService();
