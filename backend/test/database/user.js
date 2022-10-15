const { Op } = require("sequelize");
const { sequelize, User } = require("../../db/models/index")
const { consoleLogJson } = require("../../library/index")

async function start_user() {
    console.log("start_user")
    // create_user()
    // read_users()
    // read_users2()
    // read_user()
    // update_user()
    destroy_user()
    // search_users()
}
async function create_user() {
    console.log("start create_user")

    try {
        const inputData = {
            name: "abc",
            email: "5abc@abc.com",
            password: "passwordpassword",
            role: "abc",
        }

        const user = await User.create(inputData)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created User"
        const data = user.dataValues

        console.log({ msg, data })
    } catch (error) {
        console.log({ error })
    }
}

async function read_users() {
    console.log("start read_users")

    try {
        const users = await User.findAll({ include: 'posts' })
        // console.log("users", JSON.stringify(users, null, 2))

        const data = users
        const msg = users.length === 0 ? "Successfully read Users but empty" : "Successfully read Users"

        console.log({ msg, data })

    } catch (error) {
        console.log({ error })
    }

}

async function read_users2() {
    console.log("start read_users2")

    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM users");
        // console.log("users metadata", JSON.stringify(metadata, null, 2))
        const msg = "Successfully read User"
        const data = metadata

        console.log({ msg, data })
    } catch (error) {
        console.log({ error })
    }
}

async function read_user() {
    console.log("start read_user")

    const id = 2
    try {
        const user = await User.findOne({ where: { id }, include: 'posts' })
        // console.log("JSON.stringify(user, null, 2)", JSON.stringify(user, null, 2))

        console.log({ user })
        if (user === null) {
            const msg = "Successfully read User but empty"
            const data = undefined

            console.log({ msg, data })
        } else {
            const msg = "Successfully read User"
            const data = user.dataValues

            console.log({ msg, data })
        }
    } catch (error) {
        console.log({ error })
    }
}

async function update_user() {
    console.log("start update_user")
    const id = 3
    const inputData = {
        name: "updated name",
        role: "admin",
    }

    let foundUser
    try {
        foundUser = await User.findByPk(id);

        console.log({ foundUser })
    } catch (error) {
        console.log({ error })
    }

    let user
    try {
        user = await User.update(inputData, {
            where: {
                id
            }
        });
    } catch (error) {
        console.log({ error })
    }

    foundUser.name = inputData.name
    foundUser.role = inputData.role

    const msg = "Successfully updated User"
    const data = foundUser.dataValues

    console.log({ msg, data })
}

async function destroy_user() {
    console.log("start destroy_user")

    const id = 2

    try {
        await User.destroy({
            where: {
                id
            }
        });
    } catch (error) {
        console.log({ error })
    }

    const msg = "Successfully deleted User"
    const data = { id }

    console.log({ msg, data })

}

async function search_users() {
    console.log("start search_users")

    const keyword = "Doe"
    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    },
                    {
                        email: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            }
        })

        const data = users
        const msg = users.length === 0 ? "Successfully searched Users but empty" : "Successfully searched Users"

        console.log({ msg, data })
    } catch (error) {
        console.log({ error })
    }
}

module.exports = {
    start_user
}

