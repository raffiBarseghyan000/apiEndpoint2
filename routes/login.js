const express = require('express')
const router = express.Router()
const Login = require('../controller/loginController')

router.post('/', (req, res, next)=> {Login.login(req, res, next)})

module.exports = router