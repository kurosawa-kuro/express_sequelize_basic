const { sequelize, User, Post } = require("../../db/models/index")


async function start_auth() {
    console.log("start auth")

    signup()
    signin()
    profile()
}

async function signup() {
    const users = await User.findAll({ include: 'posts' })

    console.log("users", JSON.stringify(users, null, 2))
}

async function signin() {
    const users = await User.findAll({ include: 'posts' })

    console.log("users", JSON.stringify(users, null, 2))
}

async function profile() {
    const users = await User.findAll({ include: 'posts' })

    console.log("users", JSON.stringify(users, null, 2))
}
module.exports = {
    start_auth
}

