const express = require("express")
const app = express()

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

app.use((err, req, res, next) => {
    console.log(err)
})


module.exports = app