const { startUser } = require("./userDatabase.js")
const { startPost } = require("./postDatabase.js")

async function start() {
    console.log("start database index")
    startUser()
    // startPost()
    // start_book()
    // start_posts()
    // start_auth()
}

start()

