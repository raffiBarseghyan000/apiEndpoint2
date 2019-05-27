const mongoose = require('mongoose');

let dynamicSchema = new mongoose.Schema({}, {strict: false});

let entrySchema = mongoose.model('entrySchema', dynamicSchema);

module.exports = entrySchema;
