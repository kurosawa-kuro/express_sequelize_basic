const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.post('/', userController.createUser)
router.get('/', userController.readUsers)
router.get('/:id', userController.readUser)

module.exports = router