const comment = require("../model/comment.model");
class commentService {
  async createComment(params) {
    try {
    const res = await comment.create(params);
      return res
    } catch (error) {
      console.error(error);
      return error
    }
  }
  async findComment({pageNum,pageSize,goods_id}) {
    console.log(goods_id);
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await comment.findAndCountAll({
      offset,
      limit: pageSize * 1,
      where:{
        goods_id
      },
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
  async deleteComment({id}) {
    console.log(id);
    return comment.destroy({
      where: {
        id,
      },
    });
  }
  async updateComment(id, params) {
    const res = await comment.update(params, { where: { id } });
    return res[0] > 0 ? true : false;

  }
}

module.exports = new commentService();
