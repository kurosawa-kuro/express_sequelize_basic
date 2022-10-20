const { startUser } = require("./userDatabase.js")
const { startPost } = require("./postDatabase.js")
const { startSample } = require("./sample.js")

async function start() {
    console.log("start database index")
    // startUser()
    // startPost()
    startSample()
    // start_posts()
    // start_auth()
}

start()

