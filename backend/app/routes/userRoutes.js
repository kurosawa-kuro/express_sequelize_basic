const express = require('express')
const router = express.Router()

const userCreateValidator = require('../middleware/validator/userCreateValidator');
const userController = require('../controllers/userController.js')

router.get('/search', userController.searchUser)
router.post('/', userCreateValidator, userController.createUser)
router.get('/', userController.readUsers)
router.get('/:id', userController.readUser)



router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router