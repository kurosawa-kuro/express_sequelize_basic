const asyncHandler = require('express-async-handler')

const todos = [
    { id: 1, name: 'aaaaaaa', completed: false },
    { id: 2, name: 'bb', completed: false },
    { id: 3, name: 'ccccccccccc', completed: true }
]

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const readTodos = asyncHandler(async (req, res) => {
    console.log("hit readGoals")

    res.status(200).json(todos)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
    console.log('hit post todos')
    const { body } = req
    console.log({ body })

    if (typeof body.name !== 'string') {
        res.statusCode = 422
        throw new Error('name must string');
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }

    todos.push(newTodo)

    res.status(201).json(newTodo);
})


// @desc    Read todo
// @route   DELETE /api/goals/:id
// @access  Private
const readTodo = asyncHandler(async (req, res) => {
    const id = req.params.id
    const foundTodo = todos.find((todo) => todo.id === Number(id))

    if (!foundTodo) {
        res.statusCode = 404
        throw new Error('todo not found');
    }

    res.status(200).json(foundTodo);
})

module.exports = {
    createTodo,
    readTodos,
    readTodo
}