const { startUser } = require("./user_database")
const { start_book } = require("../database/book")
const { start_posts } = require("../database/post")
const { start_auth } = require("../database/auth")

async function start() {
    console.log("start database index")
    startUser()
    // start_book()
    // start_posts()
    // start_auth()
}

start()

