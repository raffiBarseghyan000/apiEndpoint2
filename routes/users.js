const express = require('express')
const router = express.Router()
const usersController = require('../controller/usersController')

router.post('/', (req, res, next)=> {usersController.saveUser(req, res, next)})

router.delete('/:username', (req, res, next)=> {usersController.deleteUser(req, res, next)})

router.put('/:username', (req, res, next)=> {usersController.updateUser(req, res, next)})

router.get('/:username', (req, res, next)=> {usersController.getUser(req, res, next)})

router.get('/', (req, res, next)=> {usersController.getAllUsers(req, res, next)})

module.exports = router