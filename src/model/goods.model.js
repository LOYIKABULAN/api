const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Goods = seq.define('zd_good',{
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品名称'
    },
    goods_price:{
        type:DataTypes.DECIMAL(10,2),//十位数，末尾保持两个小数
        allowNull:false,
        comment:'商品价格'
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品的库存'
    },
    goods_image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品图片的地址'
    },

},{
    paranoid:true
}
)

// ! 创建新表覆盖之前的旧表数据清空
// Goods.sync({force:true}); 

module.exports = Goods;