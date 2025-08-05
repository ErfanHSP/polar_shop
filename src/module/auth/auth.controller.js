const bcrypt = require("bcrypt")
const usersRepository = require("./../../repositories/users")
const jwt = require("jsonwebtoken")
const RedisService = require("./../../services/redis")

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
        await RedisService.setRefreshToken(user.id, refreshToken)
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

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                error: "Validation failed."
            })
        }
        const user = await usersRepository.findByEmail(email)
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Email or password is wrong."
            })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) {
             return res.status(403).json({
                success: false,
                message: "Email or password is wrong."
            })
        }
        const accessToken = jwt.sign({userID: user.id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}m`
        })
        const refreshToken = jwt.sign({userID: user.id, role: user.role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE}d`
        })
        await RedisService.setRefreshToken(user.id, refreshToken)
        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            tokens: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        const user = req.user
        await RedisService.deleteRefreshToken(user.id)
        return res.status(200).json({
            success: true,
            message: "Successfully logged out."
        })
    } catch (error) {
        next(error)
    }
}

exports.refreshAccessToken = async (req, res, next) => {
    try {
        const token = req.cookies["refresh-token"] || req.headers['authorization']?.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh-token not found!"
            })
        }
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const savedToken = await RedisService.getRefreshToken(decoded.userID)
        const user = await usersRepository.findById(decoded.userID)
        const compareTokens = bcrypt.compareSync(token, savedToken)
        if (!compareTokens) {
            return res.status(401).json({
                success: false,
                message: "Refresh-token is not valid."
            })
        }
        const newAccessToken = jwt.sign({userID: user.id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}m`
        })
        return res.status(200).json({
            success: true,
            message: "Access token successfully refreshed!",
            token: newAccessToken
        })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: 'Refresh token expired',
            });
        }
        next(error)   
    }
}