const asyncHandler = require('express-async-handler')

const { User } = require("../../db/models/")

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const readUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll()
    // const [results, metadata] = await sequelize.query("SELECT * FROM users");
    // console.log({ metadata })

    return res.status(200).json(users)
})


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createUser = asyncHandler(async (req, res) => {
    console.log('hit post users')
    const body = req.body

    if (!body.name || !body.email || !body.password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ where: { email: body.email } });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create(body)

    return res.status(201).json(user)
})


// @desc    Read user
// @route   DELETE /api/goals/:id
// @access  Private
const readUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundUser = await User.findOne({ where: { id } })

    if (!foundUser) {
        res.statusCode = 404
        throw new Error('user not found');
    }

    res.status(200).json(foundUser);
})

module.exports = {
    createUser,
    readUsers,
    readUser
}