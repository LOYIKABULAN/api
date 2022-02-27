const ad = require("../model/ad.model");
class adService {
  async createAd(params) {
    return ad.create(params);
  }
  async findAdvertisements(space_id) {
    return ad.findAll({
      where: { space_id },
    });
  }
  async deleteAd(id) {
    return ad.destroy({
      where: {
        id,
      },
    });
  }
  async updateAd(id, params) {
    const res = await ad.update(params, { where: { id } });
    return res[0] > 0 ? true : false;

  }
}

module.exports = new adService();
