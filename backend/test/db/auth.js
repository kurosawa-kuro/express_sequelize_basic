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

    // signup()
    // signin()
    // delete_signin_user()

    profile()
}

async function signup() {
    try {
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


        const user = await User.create(req.body)

        const resData = {
            name: user.dataValues.name,
            email: user.dataValues.email,
            token: await User.generateToken(user.id),
        }

        const msg = "Successfully signup User"
        const data = resData

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}


async function signin() {
    try {
        console.log("start signin")
        // const body = req.body
        const req = {
            body: {
                email: signin_user.email,
                password: signin_user.password
            }
        }

        // Check for user email
        const userWithEmail = await User.findOne({ where: { email: req.body.email } })
        // consoleLogJson(userWithEmail)

        if (userWithEmail && (await bcrypt.compare(req.body.password, userWithEmail.password))) {
            const resData = {
                name: userWithEmail.name,
                email: userWithEmail.email,
                token: await User.generateToken(userWithEmail.id),
            }

            const msg = "Successfully signin User"
            const data = resData

            // return res.status(201).json({ isSuccess: true, msg, data })
            console.log({ isSuccess: true, msg, data })
        } else {
            // res.statusCode = 404
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

async function profile() {
    try {
        // const body = req.body
        const req = {
            body: {
                email: signin_user.email,
                password: signin_user.password
            }
        }
        const userWithEmail = await User.findOne(
            {
                where: { email: req.body.email },
                attributes: ['name', 'email']
            })

        const msg = "Successfully profile user"
        const data = userWithEmail

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

async function delete_signin_user() {
    console.log("start delete_signin_user")
    try {
        // const body = req.body
        const req = {
            body: {
                email: signin_user.email,
                password: signin_user.password
            }
        }

        // Check for user email
        const userWithEmail = await User.findOne({ where: { email: req.body.email } })


        if (!userWithEmail) {
            // res.statusCode = 404
            throw new Error('user not exists');
        }

        await User.destroy({
            where: {
                email: "signin@signin.com"
            }
        });

        const msg = "Successfully delete_signin_user"
        const data = undefined

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startAuth
}

