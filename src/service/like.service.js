// @ts-nocheck
const UserLike = require("../model/like.model");
class LikeService {
  async clickLike(params) {
    const like = await UserLike.findOne({
      attributes: ["deletedAt"],
      where: {
        ...params,
      },
      paranoid: false,
    });


    if (like) {
      console.log('lue',like.dataValues.deletedAt);
        
      if (like.dataValues.deletedAt) {
        const res = await UserLike.restore({
          where: {
            ...params,
          },
        });
        return res > 0 ? '点赞成功' : false;
      }

      const res = await UserLike.destroy({ where: { ...params } });
      return res > 0 ? '取消点赞成功' : false;
    } else {
      const res = await UserLike.create(params);
      return res > 0 ? '点赞成功' : false;
    }
  }
  async findAllLike(params,user_id){
      const {count} = await UserLike.findAndCountAll({where:{...params}})
      const like = await UserLike.findOne({where:{...params,user_id}})
      const state = like ? true : false
      return {count,state}
  }

}

module.exports = new LikeService();
