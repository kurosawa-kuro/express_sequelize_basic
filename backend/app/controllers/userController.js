const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

const { User } = require("../../db/models/")

// @desc    Create User
// @route   POST /users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const body = req.body

    const foundUserWithEmail = await User.findOne({ where: { email: body.email } });
    // console.log({ foundUserWithId })

    if (foundUserWithEmail) {
        res.statusCode = 404
        throw new Error('user already exists');
    }

    const user = await User.create(body)
    // console.log("user", JSON.stringify(user, null, 2))

    const msg = "Successfully created User"
    const data = user

    return res.status(201).json({ isSuccess: true, msg, data })
})

// @desc    Read Users
// @route   GET /users
// @access  Public
const readUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({ include: 'posts' })
    // console.log("users", JSON.stringify(users, null, 2))

    const data = users
    const msg = users.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

    return res.status(200).json({ isSuccess: true, msg, data })
})

// @desc    Read user
// @route   GET /users/:id
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

// @desc    Delete user
// @route   DELETE users/:id
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
// @route   GET users/search?keyword
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