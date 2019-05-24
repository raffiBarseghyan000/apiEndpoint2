const express = require('express');

const router = express.Router();

const path = process.cwd();
const defaultSchema = require(`${path}/schemas/defaultSchema.js`);

router.post('/', async (req, res)=> {
    const schemaObject = new defaultSchema(req.body)
    console.log(req.body)
    await schemaObject.save()
    res.status(200).send({
        success: true,
        message: 'Insertion Completed'
    })
})

router.get('/', async (req, res)=> {
    try {
        let all
        if (parseInt(req.query.limit) !== 0) {
            all = await defaultSchema.find({}, {
                _id: false,
                __v: false
            }).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        }
        const count = await defaultSchema.countDocuments()
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
    await defaultSchema.deleteMany({})
    res.status(200).send({
        success: true,
        message: 'All entries are deleted'
    })
})

module.exports = router;