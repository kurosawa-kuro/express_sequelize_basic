const express = require('express')
const asyncHandler = require('express-async-handler')
const morgan = require("morgan");

const { errorHandler } = require('./middleware/errorMiddleware');
const { User, Post } = require("../db/models/index")

const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/users', asyncHandler(async (req, res) => {
    const body = req.body

    const user = await User.create(body)

    return res.json(user)
}))

app.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll()
    // const [results, metadata] = await sequelize.query("SELECT * FROM users");
    // console.log({ metadata })

    return res.json(users)
}))

app.get('/users/:id', asyncHandler(async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({
        where: { id },
        include: 'posts',
    })

    // console.log(JSON.stringify(user, null, 2))
    // console.log(JSON.stringify(user.posts, null, 2))

    return res.json(user)
}))

app.delete('/users/:id', asyncHandler(async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ where: { id } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
}))

app.put('/users/:id', asyncHandler(async (req, res) => {
    const id = req.params.id

    const body = req.body

    const user = await User.findOne({ where: { id } })

    user.name = body.name
    user.email = body.email
    user.role = body.role

    await user.save()

    return res.json(user)
}))

app.post('/posts', asyncHandler(async (req, res) => {
    const body = req.body

    const user = await User.findOne({ where: { id: body.userId } })

    const post = await Post.create({ ...body, userId: user.id })

    return res.json(post)
}))

app.get('/posts', asyncHandler(async (req, res) => {
    const posts = await Post.findAll({ include: 'user' })

    return res.json(posts)
}))


app.use('/todos', require('./routes/todoRoutes'));
app.use('/users', require('./routes/userRoutes'));

app.use(errorHandler);

module.exports = app;


