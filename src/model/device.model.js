//1.??sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')
const User = require('./user.model')

const Device = seq.define('zd_Device',{
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'????'
    },
    device_info:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'??????'
    },
    device_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'????'
    },
    handler_state:{
        type:DataTypes.TINYINT,
        allowNull:false,
        comment:'????????:0:false;1:true:'
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'?????id'
    }
})
Device.belongsTo(User,{
    foreignKey:'user_id',
    as:"user_info"
  })
// Device.sync({force:true})

module.exports  = Device