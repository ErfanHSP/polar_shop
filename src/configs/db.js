const mysql = require("mysql2")
require("dotenv").config()


const connectDB = () => {
    const isDevelopmentMode = process.env.NODE_ENV === "development"
    if (isDevelopmentMode) {
        const pool = mysql.createPool(process.env.MYSQL_DEV_DB).promise()
        pool.getConnection()
            .then(() => console.log("✅ DB connection was successful"))
            .catch((err) => console.error("❌ DB connection error: ", err))
    } else {
        const pool = mysql.createPool(process.env.MYSQL_PRODUCTION_DB).promise()
        pool.getConnection()
            .then(() => console.log("✅ DB connection was successful"))
            .catch((err) => console.error("❌ DB connection error: ", err))
    }

}




module.exports = connectDB