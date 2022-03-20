const {DataTypes} = require('sequelize');

const seq = require('../db/seq')
const User = require('./user.model')
const Goods = seq.define('zd_good',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'谁发布的信息'
    },
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品名称'
    },
    goods_price:{
        type:DataTypes.DECIMAL(10,2),//十位数，末尾保持两个小数
        allowNull:true,
        comment:'商品价格'
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull:true,
        comment:'商品的库存'
    },
    goods_image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品图片的地址'
    },
    detail:{
        type:DataTypes.JSON,
        allowNull:false,
        comment:'详细情况'
    },
    emit_type:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'0是商品，1是动态'
    }

},{
    paranoid:true
}
)
Goods.belongsTo(User,{
    foreignKey:'user_id',
    as:"user_info"
  })
// ! 创建新表覆盖之前的旧表数据清空
// Goods.sync({force:true}); 

module.exports = Goods;