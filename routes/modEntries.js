const express = require('express')
const router = express.Router()
const entriesController = require('../controller/entriesController')

router.post('/', (req, res, next)=> {entriesController.saveEntry(req, res, next)})

router.get('/', (req, res, next)=> {entriesController.getAllEntries(req, res, next)})

router.get('/:entry', (req, res, next)=> {entriesController.getEntry(req, res, next)})

router.put('/:entry', (req, res, next)=> {entriesController.updateEntry(req, res, next)})

router.delete('/:entry', (req, res, next)=> {entriesController.deleteEntry(req, res, next)})

module.exports = router