const bcrypt = require('bcryptjs')
const { sequelize, User, Post } = require("../../db/models/index")
const { faker } = require('@faker-js/faker');

const { consoleLogJson } = require("../../library/index")

const signin_user = {
    name: "signin",
    email: "signin@signin.com",
    password: "signinsignin"
}

async function start_auth() {
    console.log("start auth")

    // signup()
    signin()
    // delete_signin_user()

    // profile()
}

async function signup() {
    console.log("start signup")
    const inputData = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(20),
        avator: faker.image.avatar(),
        role: "normal",
    }

    inputData.name = signin_user.name
    inputData.email = signin_user.email
    inputData.password = signin_user.password

    if (!inputData.name || !inputData.email || !inputData.password) {
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ where: { email: inputData.email } });
    // consoleLogJson(userExists)

    if (userExists) {
        throw new Error('User already exists')
    }

    // Hash password
    inputData.password = await User.generateHash(inputData.password)

    try {
        const user = await User.create(inputData)

        const resData = {
            name: user.dataValues.name,
            email: user.dataValues.email,
            token: await User.generateToken(user.id),
        }
        consoleLogJson(resData)
    } catch (error) {
        console.log(error)
    }
}


async function signin() {
    console.log("start signin")
    const inputData = {
        email: signin_user.email,
        password: signin_user.password
    }
    // consoleLogJson(inputData)

    // Check for user email
    const userWithEmail = await User.findOne({ where: { email: inputData.email } })
    // consoleLogJson(userWithEmail)

    if (userWithEmail && (await bcrypt.compare(inputData.password, userWithEmail.password))) {
        const resData = {
            name: userWithEmail.name,
            email: userWithEmail.email,
            token: await User.generateToken(userWithEmail.id),
        }
        consoleLogJson(resData)
    } else {
        throw new Error('Invalid credentials')
    }
}

async function profile() {
    const users = await User.findAll({ include: 'posts' })

    console.log("users", JSON.stringify(users, null, 2))
}

async function delete_signin_user() {
    await User.destroy({
        where: {
            email: "signin@signin.com"
        }
    });

}
module.exports = {
    start_auth
}

