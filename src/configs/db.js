const mysql = require("mysql2")
require("dotenv").config()

const isDevelopmentMode = process.env.NODE_ENV === "development";
const pool = mysql
  .createPool(
    isDevelopmentMode
      ? process.env.MYSQL_DEV_DB
      : process.env.MYSQL_PRODUCTION_DB
  )
  .promise();

pool.getConnection()
  .then(() => console.log("✅ DB connection was successful"))
  .catch((err) => console.error("❌ DB connection error: ", err));

module.exports = pool;
