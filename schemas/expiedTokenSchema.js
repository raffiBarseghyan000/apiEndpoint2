const mongoose = require('mongoose');

let TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

let tokenSchema = mongoose.model('TokenSchema', TokenSchema);

module.exports = tokenSchema;