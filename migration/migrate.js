const fs = require("fs")
const db = require("./../db")
const path = require("path")

const migrate = async () => {
    const connection = await db.getConnection()
    const createUsersTableSql = fs.readFileSync(path.resolve(__dirname, "./users-ddl.sql"), "utf-8")
    await connection.beginTransaction()
    try {
        await db.query(createUsersTableSql)
        await connection.commit() // if all queries ran successfully, the operation will get accept.
    } catch (error) {
        await connection.rollback() // if one of 4 queries had any errors this removes the queries that successfully ran.
    }
}

migrate()
    .then(() => console.log("Migration ran successfully"))
    .catch((err) => db.end())