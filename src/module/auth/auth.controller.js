const bcrypt = require("bcrypt")
const usersRepository = require("./../../repositories/users")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res, next) => {
    try {
        const {email, username, fullname, password} = req.body
        // If validator module not worked, this will save your life.
        if (!email || !username || !fullname || !password) {
            return res.status(403).json({
                success: false,
                error: "Validation failure."
            })
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = await usersRepository.create(fullname, username, email, hashPassword)
        const accessToken = jwt.sign({userID: user.id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}m`
        })
        const refreshToken = jwt.sign({userID: user.id, role: user.role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE}d`
        })
        res.status(201).json({
            success: true,
            message: "New user created successfully.",
            tokens: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        next(error)
    }
}