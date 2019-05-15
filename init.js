require('dotenv').config({path: './env/.env'});

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
console.log('connecting to path => ' + process.env.db_path);
mongoose.connect(process.env.db_path);
