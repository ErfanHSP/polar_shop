const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorHandler = require("./src/middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser("coo-123sec.q"))

app.get("/health", (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Server is up and running..."
        })
    } catch (error) {
        next(error)
    }
})

// routes
const authRouter = require("./src/module/auth/auth.routes")
app.use("/auth", authRouter)

app.use(errorHandler)

module.exports = app