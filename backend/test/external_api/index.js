const { start_open_meteo } = require("./open-meteo")
// const { start_book } = require("../database/book")
// const { start_posts } = require("../database/post")
// const { start_auth } = require("../database/auth")

async function start() {
    console.log("start index")
    start_open_meteo()
    // start_book()
    // start_posts()
    // start_auth()
}

start()

