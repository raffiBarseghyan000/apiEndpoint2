const express = require('express')

const router = express.Router()

const path = process.cwd()

const userEntryJunctionSchema = require(`${path}/schemas/userEntryJunction`)
const userSchema = require(`${path}/schemas/userSchema`)

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

router.get('/:entry', async (req, res, next) => {
    try {
        const response = await userEntryJunctionSchema.countDocuments({entry: req.params.entry})
        res.status(200).send({
            success: true,
            value: response
        })
    } catch (err) {
        next(err)
    }
})

router.get('/allUsers/:entry', async (req, res, next) => {
    try {
        const response0 = await userSchema.find({})
        const response = await userEntryJunctionSchema.find({entry: req.params.entry})
        let retArr = response0.map((elem0)=> {
            let retValue = {user: elem0.username, attached: false}
            response.map((elem)=> {
                if(elem.user === elem0.username) {
                    retValue = {user: elem0.username, attached: true}
                }
            })
            return retValue
        })
        res.status(200).send({
            success: true,
            value: retArr
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router