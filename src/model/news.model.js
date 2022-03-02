//1.导入sequelize
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')

const News = seq.define('zd_News',{
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'封面图片'
    },
    detail:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'主要内容'
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'新闻标题'
    }
})

// News.sync({force:true})

module.exports  = News