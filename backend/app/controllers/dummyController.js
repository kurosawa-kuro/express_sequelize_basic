const asyncHandler = require('express-async-handler')

const dummies = [
    { id: 1, name: 'aaaaaaa', completed: false },
    { id: 2, name: 'bb', completed: false },
    { id: 3, name: 'ccccccccccc', completed: true }
]

// @desc    Read dummies
// @route   GET dummies
// @access  Public
const readDummys = asyncHandler(async (req, res) => {

    res.status(200).json(dummies)
})

// @desc    Create dummies
// @route   POST dummies
// @access  Public
const createDummy = asyncHandler(async (req, res) => {
    const { body } = req

    if (typeof body.name !== 'string') {
        res.statusCode = 422
        throw new Error('name must string');
    }

    const newDummy = {
        id: dummies.length + 1,
        name: body.name,
        completed: false
    }

    dummies.push(newDummy)

    res.status(201).json(newDummy);
})


// @desc    Read dummy
// @route   GET dummies/:id
// @access  Public
const readDummy = asyncHandler(async (req, res) => {
    const id = req.params.id
    const foundDummy = dummies.find((dummies) => dummies.id === Number(id))

    if (!foundDummy) {
        res.statusCode = 404
        throw new Error('dummies not found');
    }

    res.status(200).json(foundDummy);
})

module.exports = {
    createDummy,
    readDummys,
    readDummy
}