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

EntrySchema.statics.getIdByName = async (name)=> {
    return await entrySchema.findOne({name}, {_id: true})
}

let entrySchema = mongoose.model('entrySchema', EntrySchema)

module.exports = entrySchema
