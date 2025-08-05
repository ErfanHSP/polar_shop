const jwt = require("jsonwebtoken")
require("dotenv").config()
const usersRepository = require("./../repositories/users")

const auth = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"]
        if (!token) {
            return res.status(401).json({
                message: "Access token not found!",
                success: false
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await usersRepository.findById(decoded.userID)
        if (!user) {
            return res.status(401).json({
                message: "Access token is not valid!",
                success: false
            })
        }
        req.user = user
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired!',
            });
        }
        next(error)
    }
}

module.exports = {
    auth
}