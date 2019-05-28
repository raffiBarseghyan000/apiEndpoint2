const express = require('express')

const router = express.Router()

const path = process.cwd()
const entrySchema = require(`${path}/schemas/entrySchema.js`)

router.post('/', async (req, res, next)=> {
    try {
        const schemaObject = new entrySchema(req.body)
        console.log(req.body)
        await schemaObject.save()
        res.status(200).send({
            success: true,
            message: 'Insertion Completed'
        })
    }
    catch(err) {
        next(err)
    }
})

router.get('/', async (req, res)=> {
    try {
        let all
        if (parseInt(req.query.limit) !== 0) {
            all = await entrySchema.find({}, {
                _id: false,
                __v: false
            }).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        }
        const count = await entrySchema.countDocuments()
        res.status(200).send({
            success: true,
            result: {
                count: count,
                values: all
            }
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/', async (req, res)=> {
    await entrySchema.deleteMany({})
    res.status(200).send({
        success: true,
        message: 'All entries are deleted'
    })
})

module.exports = router