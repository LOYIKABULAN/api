//1. 导入sequelize,类型限制
const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
//2. 定义表，限制类型
const Cart = seq.define('zd_carts',{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品id'
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'商品数量'
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
        comment:'是否选中'
    }

})
//3.同步
// Cart.sync({force:true})
//4.导出

module.exports = Cart;