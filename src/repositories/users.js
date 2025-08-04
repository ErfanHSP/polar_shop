const db = require("./../configs/db")

const create = async (fullname, username, email, password) => {
    const insertQuery = "INSERT INTO polar_shop_db.users(fullname, username, email, password) VALUES(?, ?, ?, ?)"
    const selectQuery = "SELECT * FROM polar_shop_db.users WHERE id = ?"
    const [insertResult] = await db.query(insertQuery, [fullname, username, email, password])
    const [user] = await db.query(selectQuery, [insertResult.insertId])
    return user
}

module.exports = {
    create
}