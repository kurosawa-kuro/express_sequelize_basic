const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todoController.js')

router.post('/', todoController.createTodo)
router.get('/', todoController.readTodos)
router.get('/:id', todoController.readTodo)

module.exports = router