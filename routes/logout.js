const express = require('express')
const router = express.Router()
const Logout = require('../controller/logoutController')

router.post('/', (req, res, next)=> {Logout.logout(req, res, next)})

module.exports = router
