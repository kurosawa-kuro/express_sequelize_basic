var sys = require('sys');
var colors = require('colors');





// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require('sequelize');

async function startUser(Users) {
    console.log("start_user")

    // addUser(Users)
    crudUser(Users)
    // readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    // deleteUser()
    // truncateUsers()
}

const addUser = async (Users) => {
    console.log("start createUser")
    try {
        const user = await Users.create({
            name: "abc",
            email: "abc@abc.com"
        })

        const msg = "Success add user"
        const data = user.toJSON()

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const crudUser = async (Users) => {
    console.log("start crudUser")
    try {



        {
            // Create
            console.log('start crudUser create'.cyan);
            const user = await Users.create({
                name: "abc",
                email: "abc@abc.com"
            })

            const msg = "Seccess insert user"
            const data = user.toJSON()

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Read
            console.log('start crudUser read'.cyan);
            const users = await Users.findAll()

            const msg = "Seccess find all user"
            const data = users

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Update
            console.log('start crudUser Update'.cyan);
            const user = await Users.update({
                name: "update abc",
            }, { where: { id: 2 } })

            console.log({ user })

            const msg = "Seccess update user"
            const data = undefined

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Delete
            console.log('start crudUser delete'.cyan);
            const user = await Users.destroy({ where: { id: 3 } })

            console.log({ user })

            const msg = "Seccess delete user"
            const data = undefined

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Truncate
            console.log('start crudUser truncate'.cyan);
            const user = await Users.destroy({ truncate: true })

            console.log({ user })

            const msg = "Seccess truncate users"
            const data = undefined

            console.log({ isSuccess: true, msg, data })
        }

        {
            // bulk insert
            console.log('start crudUser bulk insert'.cyan);
            const users = await Users.bulkCreate([
                {
                    name: "abc2",
                    email: "abc2@abc.com"
                }, {
                    name: "abc3",
                    email: "abc3@abc.com"
                }
            ])

            const msg = "Seccess bulk insert user"
            const data = users

            console.log({ isSuccess: true, msg, data })
        }


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

        // return res.status(200).json({ isSuccess: true, msg, data })
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

        // return res.status(200).json({ isSuccess: true, msg, data })
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

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUser = async () => {
    console.log("start readUser")
    try {
        // const id = req.params.id
        const id = 1

        const user = await User.findOne({ where: { id }, include: 'posts' })
        // console.log("JSON.stringify(user, null, 2)", JSON.stringify(user, null, 2))

        const msg = user ? "Successfully found Users" : "Successfully found Users but empty"
        const data = user

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const updateUser = async () => {
    console.log("start updateUser")
    try {
        // const id = req.params.id
        const id = 2

        // const body = req.body
        const body = {
            name: "updated name",
            role: "admin",
        }

        const foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await User.update(body, {
            where: { id }
        });

        foundUserWithId.name = body.name
        foundUserWithId.role = body.role

        const msg = "Successfully updated User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const deleteUser = async () => {
    console.log("start deleteUser")
    try {
        // const id = req.params.id
        const id = 2

        const foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await User.destroy({
            where: { id }
        });
        const msg = "Successfully deleted User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const searchUsers = async () => {
    console.log("start searchUsers")
    try {
        // const { keyword } = req.query
        const keyword = "Doe"

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

        // return res.status(200).json({ isSuccess: true, msg, data })
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
        const msg = "Successfully truncate Users"

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startUser
}

