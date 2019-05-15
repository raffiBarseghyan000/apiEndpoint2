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
    const result = await defaultSchema.find({}, {_id: false, __v: false})
    res.status(200).send({
        success: true,
        result: result
    })
})

router.delete('/', async (req, res)=> {
    await defaultSchema.deleteMany({})
    res.status(200).send({
        success: true,
        message: 'All entries are deleted'
    })
})

module.exports = router;