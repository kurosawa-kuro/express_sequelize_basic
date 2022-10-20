const { startUser } = require("./user.js")
const { startAuth } = require("./auth.js")
const { startPost } = require("./post.js")
const { startSample } = require("./sample.js")

async function start() {
    console.log("start database index")
    // startUser()
    // startPost()
    // startSample()
    // start_posts()
    startAuth()
}

start()

