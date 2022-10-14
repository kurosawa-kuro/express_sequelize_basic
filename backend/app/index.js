const express = require('express')
const createError = require('http-errors');

const { sequelize, User, Post } = require("../db/models/index")

const app = express()

app.use(express.json())

app.post('/users', async (req, res) => {
    const { name, email, role } = req.body

    try {
        const user = await User.create({ name, email, role })

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        // const [results, metadata] = await sequelize.query("SELECT * FROM users");
        // console.log({ metadata })

        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: { id },
            include: 'posts',
        })

        // console.log(JSON.stringify(user, null, 2))
        // console.log(JSON.stringify(user.posts, null, 2))

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })

        await user.destroy()

        return res.json({ message: 'User deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try {
        const user = await User.findOne({ where: { uuid } })

        user.name = name
        user.email = email
        user.role = role

        await user.save()

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/posts', async (req, res) => {
    console.log("hits post's posts")
    const { userUuid, body } = req.body
    console.log({ userUuid })
    console.log({ body })
    try {
        const user = await User.findOne({ where: { uuid: userUuid } })

        const post = await Post.create({ body, userId: user.id })

        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({ include: 'user' })

        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

const todos = [{ id: 1, name: 'aaaaaaa', completed: false }]
/* GET users listing. */
app.get('/todos', function (req, res, next) {
    console.log("hit get /todos")
    res.json(todos);
});

app.get('/todos/:id', function (req, res, next) {
    const foundTodo = todos.find((todo) => todo.id === Number(req.params.id))
    console.log({ foundTodo })
    if (!foundTodo) {
        // 404
        return next(createError(404, 'Not Found'))
    }
    res.json(foundTodo);
});

app.post('/todos', function (req, res, next) {
    console.log('hit post todos')
    const { body } = req
    console.log({ body })

    if (typeof body.name !== 'string') {
        return next(createError(422, 'Name Validation Error'))
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }

    todos.push(newTodo)
    res.status(201).json(newTodo);
});


module.exports = app;


