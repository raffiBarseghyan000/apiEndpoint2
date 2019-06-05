const express = require('express')
const router = express.Router()
const userEntryJunction = require('../controller/usersEntryJunctionController')

router.delete('/', (req, res, next)=> {userEntryJunction.deleteUserEntryJunction(req, res, next)})

router.post('/', (req, res, next)=> {userEntryJunction.saveUserEntryJunction(req, res, next)})

router.get('/:entry', (req, res, next)=> {userEntryJunction.getAllUsers(req, res, next)})

router.get('/count/:entry', (req, res, next)=> {userEntryJunction.getUserCount(req, res, next)})

module.exports = router