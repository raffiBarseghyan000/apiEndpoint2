const mongoose = require('mongoose')
const User = require('./userSchema')
const Entry = require('./entrySchema')


const UserEntryJunctionSchema = new mongoose.Schema({
    user: {
        validate: {
            validator: (v)=> {
                return User.findOne({_id: v})
            },
            message: 'invalid username'
        },
        type: String,
        ref: User
    },
    entry: {
        validate: {
            validator: (v)=> {
                return Entry.findOne({_id: v})
            },
            message: 'invalid entry'
        },
        type: String,
        ref: Entry
    }
})

UserEntryJunctionSchema.index({ user: 1, entry: 1 }, { unique: true })

const userEntryJunctionSchema = mongoose.model('userEntryJunctionSchema', UserEntryJunctionSchema)

module.exports = userEntryJunctionSchema