const express = require('express');

const router = express.Router();

const path = process.cwd();
const userSchema = require(`${path}/schemas/userSchema`);

router.post('/', async (req, res, next)=> {
    try {
        await new userSchema(req.body).save()
        res.status(200).send({
            success: true,
            message: 'User created'
        })
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:username', async (req, res, next)=> {
    try {
        await userSchema.deleteOne({username: req.params.username})
        res.status(200).send({
            success: true,
            message: 'User has been deleted'
        })
    }
    catch(err) {
        next(err)
    }
})

router.put('/:username', async (req, res, next)=> {
    try {
        await userSchema.findOneAndUpdate({username: req.params.username}, {username: req.body.username})
        res.status(200).send({
            success: true,
            message: `Username changed to ${req.body.username}`
        })
    }
    catch(err) {
        next(err)
    }
})

router.get('/', async (req, res)=> {
    let all
    if(req.body.limit !== 0) {
        all = await userSchema.find({}, {
            _id: false,
            __v: false,
            password: false
        }).skip(req.body.offset).limit(req.body.limit)
    }
    const count = await userSchema.countDocuments()
    res.status(200).send({
        success: true,
        result: {
            count,
            values: all
        }
    })
})

module.exports = router;