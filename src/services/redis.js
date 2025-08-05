const {Redis} = require("ioredis")

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
    return await redis.set(getRefreshTokenRedisKey(userId), refreshToken, "EX", parseExpireTime(process.env.REFRESH_TOKEN_EXPIRE))

}

module.exports = {
    setRefreshToken,
    getRefreshTokenRedisKey
}