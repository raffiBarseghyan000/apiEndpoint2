const path = process.cwd()
const entrySchema = require(`${path}/schemas/entrySchema.js`)
const userEntryJunctionSchema = require(`${path}/schemas/userEntryJunction.js`)

class Entry {

    static async saveEntry(req, res, next) {
        try {
            const schemaObject = new entrySchema(req.body)
            await schemaObject.save()
            res.status(200).send({
                success: true,
                message: 'Insertion Completed'
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAllEntries(req, res, next) {
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
        } catch (err) {
            next(err)
        }
    }

    static async getEntry(req, res, next) {
        try {
            const result = await entrySchema.findOne({name: req.params.entry}, {_id: false, __v: false})
            if (result === null) {
                res.status(400).send({
                    success: false,
                    message: `entry with ${req.params.entry} name not found`
                })
            } else {
                res.status(200).send({
                    success: true,
                    result: result
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateEntry(req, res, next) {
        try {
            delete req.body.entry
            const response = await entrySchema.findOneAndUpdate({name: req.params.entry}, req.body)
            if (response) {
                res.status(200).send({
                    success: true,
                    message: `Entry updated`
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteEntry(req, res, next) {
        try {
            const response = await userEntryJunctionSchema.findOne({entry: req.params.entry})
            if (response === null) {
                await entrySchema.deleteOne({name: req.params.entry})
                res.status(200).send({
                    success: true,
                    message: 'Entry has been deleted'
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Entry has user(s) attached to it, detach and try again'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Entry

// router.post('/', async (req, res, next)=> {
//     try {
//         const schemaObject = new entrySchema(req.body)
//         console.log(req.body)
//         await schemaObject.save()
//         res.status(200).send({
//             success: true,
//             message: 'Insertion Completed'
//         })
//     }
//     catch(err) {
//         next(err)
//     }
// })
//
// router.get('/', async (req, res)=> {
//     try {
//         let all
//         if (parseInt(req.query.limit) !== 0) {
//             all = await entrySchema.find({}, {
//                 _id: false,
//                 __v: false
//             }).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
//         }
//         const count = await entrySchema.countDocuments()
//         res.status(200).send({
//             success: true,
//             result: {
//                 count: count,
//                 values: all
//             }
//         })
//     }
//     catch (err) {
//         next(err)
//     }
// })
//
// router.get('/:entry', async (req, res, next) => {
//     const result = await entrySchema.findOne({name: req.params.entry}, {_id: false, __v: false})
//     if (result === null) {
//         res.status(400).send({
//             success: false,
//             message: `entry with ${req.params.entry} name not found`
//         })
//     } else {
//         res.status(200).send({
//             success: true,
//             result: result
//         })
//     }
// })
//
// router.put('/:name', async (req, res, next) => {
//     try {
//         delete req.body.name
//         const response = await entrySchema.findOneAndUpdate({name: req.params.name}, req.body)
//         if(response) {
//             res.status(200).send({
//                 success: true,
//                 message: `Entry updated`
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// })
//
// router.delete('/:name', async (req, res, next) => {
//     try {
//         const response = await userEntryJunctionSchema.findOne({entry: req.params.name})
//         if(response === null) {
//             await entrySchema.deleteOne({name: req.params.name})
//             res.status(200).send({
//                 success: true,
//                 message: 'Entry has been deleted'
//             })
//         }
//         else {
//             res.status(400).send({
//                 success: false,
//                 message: 'Entry has user(s) attached to it, detach and try again'
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// })
//
// module.exports = router