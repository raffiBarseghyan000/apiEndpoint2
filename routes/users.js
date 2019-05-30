const express = require('express')
const router = express.Router()

router.use('/', require('../controller/usersController'))

module.exports = router