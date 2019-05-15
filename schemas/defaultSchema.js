const mongoose = require('mongoose');

let dynamicSchema = new mongoose.Schema({}, {strict: false});

let defaultSchema = mongoose.model('defaultSchema', dynamicSchema);

module.exports = defaultSchema;
