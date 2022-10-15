const { Op } = require("sequelize");
const { sequelize, User } = require("../../db/models/index")

async function startUser() {
    console.log("start_user")

    // createUser()
    readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    // deleteUser()
    // truncateUsers()
}

const createUser = async () => {
    try {
        console.log("start createUser")

        const body = {
            name: "abc",
            email: "abc@abc.com",
            password: "unhashed_password",
            role: "normal",
        }

        const foundUserWithEmail = await User.findOne({ where: { email: body.email } });
        // console.log({ foundUserWithId })

        if (foundUserWithEmail) {
            // res.statusCode = 404
            throw new Error('user already exists');
        }

        const user = await User.create(body)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created User"
        const data = user

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers = async () => {
    console.log("start read_users")

    try {
        const users = await User.findAll({ include: 'posts' })
        // console.log("users", JSON.stringify(users, null, 2))

        const data = users
        const msg = users.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers2 = async () => {
    console.log("start readUsers2")

    try {
        const users = await User.findAll({ include: 'posts' })
        // console.log("users", JSON.stringify(users, null, 2))

        let arrangedResData = [];
        users.forEach(row => {
            arrangedResData.push(
                {
                    "id": row.id,
                    "name": row.name,
                    "email": row.email,
                    "password": row.password,
                    "role": row.role,
                    "avator": row.avator ? row.avator : "https://www.publicdomainpictures.net/pictures/300000/nahled/empty-white-room.jpg"
                }
            );
        });
        // console.log("arrangedResData", JSON.stringify(arrangedResData, null, 2))

        const data = arrangedResData
        const msg = users.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers3 = async () => {
    console.log("start readUsers3")

    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM users");
        // console.log("users metadata", JSON.stringify(metadata, null, 2))
        const msg = "Successfully read User"
        const data = metadata

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUser = async () => {
    console.log("start readUser")

    const id = 1

    try {
        const user = await User.findOne({ where: { id }, include: 'posts' })
        // console.log("JSON.stringify(user, null, 2)", JSON.stringify(user, null, 2))

        const msg = user ? "Successfully searched Users" : "Successfully searched Users but empty"
        const data = user

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const updateUser = async () => {
    console.log("start updateUser")

    const id = 2

    const inputData = {
        name: "updated name",
        role: "admin",
    }

    let foundUserWithId
    try {
        foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }

    if (!foundUserWithId) {
        throw new Error('user not found');
    }

    try {
        await User.update(inputData, {
            where: { id }
        });

        foundUserWithId.name = inputData.name
        foundUserWithId.role = inputData.role

        const msg = "Successfully updated User"
        const data = foundUserWithId

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const deleteUser = async () => {
    console.log("start deleteUser")

    const id = 2

    let foundUserWithId
    try {
        foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }

    if (!foundUserWithId) {
        throw new Error('user not found');
    }

    try {
        await User.destroy({
            where: { id }
        });
        const msg = "Successfully deleted User"
        const data = foundUserWithId

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const searchUsers = async () => {
    console.log("start searchUsers")

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

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncateUsers = async () => {
    console.log("start truncateUsers")

    try {
        await User.destroy({
            truncate: true
        });

        const data = []
        const msg = "Successfully truncate Users but"

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startUser
}

