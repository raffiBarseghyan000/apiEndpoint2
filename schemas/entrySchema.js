const mongoose = require('mongoose')

let EntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
})

let entrySchema = mongoose.model('entrySchema', EntrySchema)

module.exports = entrySchema
