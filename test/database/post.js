const { sequelize, Post } = require("../../db/models/index")
const { consoleLogJson } = require("./library")

async function start_posts() {
    console.log("start_posts")
    // create_users()
    // read_posts()
    // read_users2()
    // read_user()
    // update_user()
    // destroy_user()
}

async function read_posts() {
    const posts = await Post.findAll({ include: 'user' })

    consoleLogJson(posts)
}

async function read_users2() {
    const [results, metadata] = await sequelize.query("SELECT * FROM users");
    console.log("users metadata", JSON.stringify(metadata, null, 2))
}

async function read_user() {
    const uuid = '35cf1b89-56d3-433c-9f43-4198eb3725de'
    const users = await User.findOne({ where: { uuid }, include: 'posts' })
    console.log("users", JSON.stringify(users, null, 2))
    consoleLogJson(books)
}

async function create_users() {
    const inputData = {
        name: "abc",
        email: "abc@abc.com",
        role: "abc",
    }
    const user = await User.create(inputData)
    console.log("user", JSON.stringify(user, null, 2))
}

async function update_user() {
    const uuid = '35cf1b89-56d3-433c-9f43-4198eb3725de'
    const inputData = {
        name: "abc",
        email: "abc@abc.com",
        role: "abc",
    }
    const user = await User.findOne({ where: { uuid } })

    user.name = inputData.name
    user.email = inputData.email
    user.role = inputData.role

    await user.save()
    console.log("user", JSON.stringify(user, null, 2))
}

async function destroy_user() {
    const uuid = '35cf1b89-56d3-433c-9f43-4198eb3725de'
    await User.destroy({
        where: {
            uuid
        }
    });
    console.log("delete user")
}

module.exports = {
    start_posts
}

