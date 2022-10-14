const express = require('express')
const asyncHandler = require('express-async-handler')
const morgan = require("morgan");

const { errorHandler } = require('./middleware/errorMiddleware');
const { User, Post } = require("../db/models/index")

const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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


