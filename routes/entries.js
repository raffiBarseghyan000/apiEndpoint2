const express = require('express')
const router = express.Router()

router.use('/users', require('./userEntryJunction'))

router.use('/', require('./modEntries'))

module.exports = router