const app = require("./app")
const connectDB = require("./src/configs/db")
require("dotenv").config()


app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
    connectDB()
})