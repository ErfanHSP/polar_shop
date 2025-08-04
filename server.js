const app = require("./app")
require("./src/configs/db")
require("dotenv").config()

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})