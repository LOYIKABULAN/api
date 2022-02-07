// @ts-nocheck
const { Sequelize } = require("sequelize");
const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
} = require("../config/config.default");
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql", /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  timezone: "+08:00",
});
//用来测试是否成功连接数据库
seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

module.exports = seq;
