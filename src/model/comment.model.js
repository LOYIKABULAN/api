//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')

const UserComment = seq.define('zd_comment',{
   user_name:{
       type:DataTypes.STRING,
       allowNull:false,
       comment:'评论用户名'
   },
   user_avatar:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'用户头像'
  },
   goods_id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       comment:'评论商品或动态的id'
   },
   comment:{
       type:DataTypes.TEXT,
       allowNull:false,
       comment:'评论内容'
   }
})


// UserComment.sync({force:true})

module.exports  = UserComment