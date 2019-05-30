const express = require('express')

const router = express.Router()

const path = process.cwd()

const userEntryJunctionSchema = require(`${path}/schemas/userEntryJunction`)

router.delete('/:username', (req, res, next) => {
    userEntryJunctionSchema.deleteOne({user: req.params.username, entry: req.body.entry}).then(() => {
        res.status(200).send({
            success: true,
            message: "Entry detached"
        })
    }).catch((err) => {
        next(err)
    })
})

router.post('/:username', (req, res, next) => {
    new userEntryJunctionSchema({user: req.params.username, entry: req.body.entry}).save().then(() => {
        res.status(200).send({
            success: true,
            message: "Entry attached"
        })
    }).catch((err) => {
        next(err)
    })
})

router.get('/:entry', async (req, res, next)=> {
    try {
        const response = await userEntryJunctionSchema.countDocuments({entry: req.params.entry})
        res.status(200).send({
            success: true,
            value: response
        })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router