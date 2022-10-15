const { Op } = require("sequelize");
const { sequelize, User } = require("../../db/models/index")

async function start_user() {
    console.log("start_user")

    // create_user()
    // read_users()
    read_users2()
    // read_users3()
    // read_user()
    // search_users()
    // update_user()
    // destroy_user()
    // truncate_users()

}

const create_user = async () => {
    console.log("start create_user")

    const inputData = {
        name: "abc",
        email: "abc@abc.com",
        password: "unhashed_password",
        role: "normal",
    }

    try {
        const user = await User.create(inputData)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created User"
        const data = user

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const read_users = async () => {
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

const read_users2 = async () => {
    console.log("start read_users2")

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

const read_users3 = async () => {
    console.log("start read_users2")

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

const read_user = async () => {
    console.log("start read_user")

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

const update_user = async () => {
    console.log("start update_user")

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

const destroy_user = async () => {
    console.log("start destroy_user")

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

const search_users = async () => {
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

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncate_users = async () => {
    console.log("start truncate_users")

    try {
        await User.destroy({
            truncate: true
        });

        const data = []
        const msg = "Successfully truncate Users but empty"

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    start_user
}

