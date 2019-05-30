const express = require('express')
const router = express.Router()

router.use('/', require('../controller/entriesController'))

module.exports = router