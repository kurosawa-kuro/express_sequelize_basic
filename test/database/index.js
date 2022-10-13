const { start_user } = require("../database/user")
const { start_book } = require("../database/book")
const { start_posts } = require("../database/post")

async function start() {
    console.log("start index")
    // start_user()
    // start_book()
    start_posts()
}

start()

