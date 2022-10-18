var sys = require('sys');
var colors = require('colors');





// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require('sequelize');

async function startRelationOperation(db) {
    console.log("startRelationOperation")

    // setup(db)
    // oneToOne(db)
    oneToOneDelete(db)

    // crudUser(Users)


    // readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    // deleteUser()
    // truncateUsers()
}

const setup = async (db) => {
    console.log("start setup")
    try {
        {
            // bulk insert users
            console.log('start oneToone setup bulk insert users'.cyan);
            const users = await db.users.bulkCreate([
                {
                    name: "abc1",
                    email: "abc1@abc.com"
                },
                {
                    name: "abc2",
                    email: "abc2@abc.com"
                }, {
                    name: "abc3",
                    email: "abc3@abc.com"
                }
            ])
            // console.log("users", JSON.stringify(users, null, 2))

            // bulk insert posts
            console.log('start oneToone setup bulk insert posts'.cyan);
            const posts = await db.posts.bulkCreate([
                {
                    name: "name1",
                    title: "title1",
                    content: "content content content content content1",
                    user_id: 1,
                }, {
                    name: "name1",
                    title: "title1",
                    content: "content content content content content1",
                    user_id: 1,
                    // UserId: 1,
                }, {
                    name: "name2",
                    title: "title2",
                    content: "content content content content content2",
                    user_id: 1,
                    // UserId: 1,
                }, {
                    name: "name3",
                    title: "title3",
                    content: "content content content content content3",
                    user_id: 1,
                    // UserId: 1,
                }, {
                    name: "name4",
                    title: "title4",
                    content: "content content content content content4",
                    user_id: 2,
                    // UserId: 1,
                }
            ])

            const msg = "Seccess bulk insert posts"
            const data = posts
            // console.log("posts", JSON.stringify(data, null, 2))

            // console.log({ isSuccess: true, msg, data })
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const oneToOne = async (db) => {
    console.log("start oneToOne")
    try {
        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            console.log("db.users", db.users)
            console.log("db.posts", db.posts)
            const posts = await db.users.findAll({ include: db.posts })

            const data = posts
            console.log("posts", JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const oneToOneDelete = async (db) => {
    console.log("start oneToOneDelete")
    try {
        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            console.log("db.users", db.users)
            console.log("db.posts", db.posts)
            const post = await db.users.destroy({ where: { id: 1 } })

            const data = post
            console.log("posts", JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}


module.exports = {
    startRelationOperation
}

