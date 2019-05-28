const express = require('express')

const router = express.Router()

const path = process.cwd()
const userSchema = require(`${path}/schemas/userSchema`)
const entrySchema = require(`${path}/schemas/entrySchema`)
const userEntryJunctionSchema = require(`${path}/schemas/userEntryJunction`)

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
        await userSchema.findOneAndUpdate({username: req.params.username}, req.body)
        res.status(200).send({
            success: true,
            message: `User updated`
        })
    }
    catch(err) {
        next(err)
    }
})

router.delete('/attachedEntry/:username', async (req, res, next)=> {
    try {
        const userId = await userSchema.getIdByUsername(req.params.username)
        const entryIds = []
        const failedArray = []
        req.body.entries.map(async (entryName) => {
            try {
                entryIds.push({entryName, id: await entrySchema.getIdByName(entryName)})
            }
            catch (err) {
                entryIds.push({entryName, id: null, err: err.message})
            }
        })
        entryIds.map(async (entryId)=> {
            if (entryId.id) {
                await userEntryJunctionSchema.deleteOne({user: userId, entry: entryId.id})
            }
            else {
                failedArray.push({entryName: entryId.entryName, reason: entryId.err})
            }
        })
        res.status(200).send({
            success: true,
            message: failedArray
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/attachedEntry/:username', async (req, res, next)=> {
    try {
        const userId = await userSchema.getIdByUsername(req.params.username)
        const entryIds = []
        const failedArray = []
        req.body.entries.map(async (entryName, index) => {
            try {
                const id = await entrySchema.getIdByName(entryName)
                entryIds.push({entryName, id})
            }
            catch (err) {
                entryIds.push({entryName, id: null, err: err.message})
            }
        })
        entryIds.map(async (entryId)=> {
            if (entryId.id) {
                await userEntryJunctionSchema.save({user: userId, entry: entryId.id})
            }
            else {
                failedArray.push({entryName: entryId.entryName, reason: entryId.err})
            }
        })
        res.status(200).send({
            success: true,
            message: failedArray

        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/:username', async (req, res, next)=> {
    const result = await userSchema.findOne({username: req.params.username}, {_id: false, __v: false, password: false})
    if(result === null) {
        res.status(400).send({
            success: false,
            message: `user with ${req.params.username} username not found`
        })
    }
    else {
        res.status(200).send({
            success: true,
            result: result
        })
    }
})

router.get('/', async (req, res, next)=> {
    try {
        let all
        if (parseInt(req.query.limit) !== 0) {
            all = await userSchema.find({}, {
                _id: false,
                __v: false,
                password: false
            }).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        }
        const count = await userSchema.countDocuments()
        res.status(200).send({
            success: true,
            result: {
                count,
                values: all
            }
        })
    }
    catch(err) {
        next(err)
    }
})

module.exports = router