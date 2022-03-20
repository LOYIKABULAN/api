//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')

const UserLike = seq.define('zd_Like',{
   user_id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       comment:'点赞用户的id'
   },
   goods_id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       comment:'点赞商品或动态的id'
   }
},{
    paranoid: true
})

// UserLike.sync({force:true})

module.exports  = UserLike