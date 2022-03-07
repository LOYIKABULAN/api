//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')
const User = require('./user.model')
const Resident = seq.define('zd_Resident',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户的id'
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'住户住址'
    },
    resident_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'住户姓名'
    },
    phone_num:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'住户手机号码'
    },
    resident_type:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'住户类型，0:房主；1:租客, 3:其他'
    }
})
Resident.belongsTo(User,{
    foreignKey:'user_id',
    as:"user_info"
  })
// Resident.sync({force:true})

module.exports  = Resident