var sys = require('sys');
var colors = require('colors');





// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require('sequelize');

async function startRelationOperation(db) {
    console.log("startRelationOperation")

    oneToOne(db)
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

const oneToOne = async (db) => {
    console.log("start oneToOne")
    try {
        // {
        //     // bulk insert
        //     console.log('start crudUser bulk insert'.cyan);
        //     const posts = await db.posts.bulkCreate([
        //         {
        //             name: "name1",
        //             title: "title1",
        //             content: "content content content content content1",
        //             user_id: 1,
        //         }, {
        //             name: "name1",
        //             title: "title1",
        //             content: "content content content content content1",
        //             user_id: 1,
        //             // UserId: 1,
        //         }, {
        //             name: "name2",
        //             title: "title2",
        //             content: "content content content content content2",
        //             user_id: 1,
        //             // UserId: 1,
        //         }, {
        //             name: "name3",
        //             title: "title3",
        //             content: "content content content content content3",
        //             user_id: 1,
        //             // UserId: 1,
        //         }, {
        //             name: "name4",
        //             title: "title4",
        //             content: "content content content content content4",
        //             user_id: 2,
        //             // UserId: 1,
        //         }
        //     ])

        //     const msg = "Seccess bulk insert user"
        //     const data = posts
        //     console.log("posts", JSON.stringify(data, null, 2))

        //     console.log({ isSuccess: true, msg, data })
        // }

        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            console.log("db.users", db.users)
            console.log("db.posts", db.posts)
            const posts = await db.users.findAll({ include: db.posts })

            const msg = "Seccess bulk insert user"
            const data = posts
            console.log("posts", JSON.stringify(data, null, 2))

            console.log({ isSuccess: true, msg, data })
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}


module.exports = {
    startRelationOperation
}

