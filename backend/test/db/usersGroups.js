const { Op } = require("sequelize");
const db = require("../../db/models/index")
// const { User } = require("../../db/models/index")

async function startUsersGroups() {
    console.log("startUsersGroups")
    // console.log({ User })

    // createUsersGroups()
    // readUsersGroups()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    deleteUser()
    // truncateUsers()
}

const createUsersGroups = async () => {
    console.log("start createUsersGroups")
    try {
        // const body = req.body
        const req = {
            body: {
                user_id: 3,
                group_id: 5,
            }
        }

        const foundUserWithId = await db.User.findByPk(req.body.user_id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not exists');
        }

        const foundGroupWithId = await db.Group.findByPk(req.body.group_id);
        // console.log({ foundGroupWithId })

        if (!foundGroupWithId) {
            // res.statusCode = 404
            throw new Error('group not exists');
        }

        const usersGroups = await db.UsersGroups.create(req.body)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created UsersGroups"
        const data = usersGroups

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsersGroups = async () => {
    console.log("start readUsersGroups")
    try {
        const usersGroups = await db.UsersGroups.findAll({
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name']
                }, {
                    model: db.Group,
                    as: 'group',
                    attributes: ['name']
                },
            ],
        })
        console.log("usersGroups", JSON.stringify(usersGroups, null, 2))

        const data = usersGroups
        const msg = data.length !== 0 ? "Successfully read usersGroups" : "Successfully read usersGroups but empty"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers2 = async () => {
    console.log("start readUsers2")
    try {
        const user = await db.User.findByPk(1)
        // console.log("users", JSON.stringify(users, null, 2))
        // console.log({ user })

        const aaa = user.aaa(123)
        console.log({ aaa })

        // return res.status(200).json({ isSuccess: true, msg, data })
        // console.log({ isSuccess: true, msg, data })
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

        const user = await db.User.findOne({ where: { id }, include: 'posts' })
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

        const foundUserWithId = await db.User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await db.User.update(body, {
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
        const id = 1

        const foundUserWithId = await db.User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await db.User.destroy({
            where: { id }
        });

        const foundUsersGroupsWithId = await db.UsersGroups.findByPk(id);

        if (foundUsersGroupsWithId !== null) {
            // res.statusCode = 404
            throw new Error('user exists');
        }

        const msg = "Successfully deleted User"
        const data = undefined

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

        const users = await db.User.findAll({
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
        const msg = data.length === 0 ? "Successfully searched Users but empty" : "Successfully searched Users"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncateUsers = async () => {
    console.log("start truncateUsers")

    try {
        await db.User.destroy({
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
    startUsersGroups
}

