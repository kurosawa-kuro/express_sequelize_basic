const bcrypt = require('bcryptjs')
const { User } = require("../../db/models/index")
const { faker } = require('@faker-js/faker');

const { consoleLogJson } = require("../../library/index")

const signin_user = {
    name: "signin",
    email: "signin@signin.com",
    password: "signinsignin"
}

async function startAuth() {
    console.log("start auth")

    signup()
    // signin()
    // delete_signin_user()

    // profile()
}

async function signup() {
    console.log("start signup")

    // const body = req.body
    const req = {
        body: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(20),
            admin: false,
        }
    }

    req.body.name = signin_user.name
    req.body.email = signin_user.email
    req.body.password = signin_user.password

    if (!req.body.name || !req.body.email || !req.body.password) {
        // res.statusCode = 404
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // consoleLogJson(userExists)

    if (userExists) {
        // res.statusCode = 404
        throw new Error('User already exists')
    }

    // Hash password
    req.body.password = await User.generateHash(req.body.password)

    try {
        const user = await User.create(req.body)

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
    const userWithEmail = await User.findOne({ where: { email: req.body.email } })
    // consoleLogJson(userWithEmail)

    if (userWithEmail && (await bcrypt.compare(req.body.password, userWithEmail.password))) {
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
    startAuth
}

