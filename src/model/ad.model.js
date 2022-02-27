//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')

const Advertisement = seq.define('zd_advertisements',{
    space_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'广告位置，1:首页轮播图'
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'广告图片地址'
    },
    link:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'图片指向的链接'
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'广告标题'
    }
})

// Advertisement.sync({force:true})

module.exports  = Advertisement