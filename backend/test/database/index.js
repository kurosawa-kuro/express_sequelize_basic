const { start_user } = require("../database/user")
const { start_book } = require("../database/book")
const { start_posts } = require("../database/post")
const { start_auth } = require("../database/auth")

async function start() {
    console.log("start index")
    start_user()
    // start_book()
    // start_posts()
    // start_auth()
}

start()

