// @ts-nocheck

const {DataTypes} = require('sequelize')

const seq = require('../db/seq')
//创建模型（Model zd_user -> zd_users
const User = seq.define('zd_user',{
    //id 会被sequelize 自动创建管理
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        Comment:'用户名，唯一'
    },
    password: {
        type:DataTypes.CHAR(64),
        allowNull:false,
        Comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        Comment:'是否为管理员，0：不是管理员（默认）；1：是管理员'
    }
},{
    timestamps:true//false 是时候默认不创建时间更新时间如上传时间
})

//强制同步数据库（创建数据表）
// User.sync({force:true})

module.exports = User