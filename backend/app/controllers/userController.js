const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

const { User } = require("../../db/models/")

// @desc    Create User
// @route   POST /api/goals
// @access  Public
const createUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

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

// @desc    Get goals
// @route   GET /api/goals
// @access  Public
const readUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll()
    // const [results, metadata] = await sequelize.query("SELECT * FROM users");
    // console.log({ metadata })

    return res.status(200).json(users)
})

// @desc    Read user
// @route   GET /api/goals/:id
// @access  Public
const readUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundUser = await User.findOne({ where: { id } })

    if (!foundUser) {
        res.statusCode = 404
        throw new Error('user not found');
    }

    res.status(200).json(foundUser);
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
    // const id = req.params.id

    // const foundUser = await User.findOne({ where: { id } })

    // if (!foundUser) {
    //     res.statusCode = 404
    //     throw new Error('user not found');
    // }

    // res.status(200).json(foundUser);
})

// @desc    Update user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    // const id = req.params.id

    // const foundUser = await User.findOne({ where: { id } })

    // if (!foundUser) {
    //     res.statusCode = 404
    //     throw new Error('user not found');
    // }

    // res.status(200).json(foundUser);
})

// @desc    Search user
// @route   GET /api/users/search/:keyword
// @access  Public
const searchUser = asyncHandler(async (req, res) => {
    const { keyword } = req.query

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

    res.status(200).json(users);
})


module.exports = {
    createUser,
    readUsers,
    readUser,
    searchUser,
    updateUser,
    deleteUser
}