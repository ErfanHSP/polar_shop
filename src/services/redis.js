const {Redis} = require("ioredis")
const bcrypt = require("bcrypt")

const redis = new Redis({
    port: 6379,
    host: "localhost"
})

const parseExpireTime = (time) => {
    const days = parseInt(time)
    return 60 * 60 * 24 * days
}

const getRefreshTokenRedisKey = (userId) => {
    return `refresh-token:${userId}`
}
const getResetTokenRedisKey = (userId) => {
    return `reset-token:${userId}`
}

const setRefreshToken = async (userId, refreshToken) => {
    const hashToken = bcrypt.hashSync(refreshToken, 10)
    return await redis.set(getRefreshTokenRedisKey(userId), hashToken, "EX", parseExpireTime(process.env.REFRESH_TOKEN_EXPIRE))
}

const deleteRefreshToken = async (userId) => {
    return await redis.del(getRefreshTokenRedisKey(userId))
}

const getRefreshToken = async (userId) => {
    return await redis.get(getRefreshTokenRedisKey(userId))
}

const setResetToken = async (userId, resetToken) => {
    const hashToken = bcrypt.hashSync(resetToken, 10)
    return await redis.set(getResetTokenRedisKey(userId), hashToken, "EX", parseExpireTime(process.env.RESET_TOKEN_EXPIRE))
}

module.exports = {
    setRefreshToken,
    getRefreshTokenRedisKey,
    deleteRefreshToken,
    getRefreshToken,
    setResetToken
}