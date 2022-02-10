//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')
//2.定义字段
const Address = seq.define('zd_addresses',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    consignee:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收货人姓名'
    },
    phone:{
        type:DataTypes.CHAR(11),
        allowNull:false,
        comment:'收货人手机号码',
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收货地址'
    },
    is_default:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:false,
        comment:'是否为默认地址,0:不是;1:是'
    }
})
//3.同步
// Address.sync({force:true});
//4.导出

module.exports = Address