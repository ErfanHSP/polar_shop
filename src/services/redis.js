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

module.exports = {
    setRefreshToken,
    getRefreshTokenRedisKey,
    deleteRefreshToken,
    getRefreshToken
}