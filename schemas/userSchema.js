const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
});

UserSchema.pre('save', function (next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

UserSchema.methods.comparePassword = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
};

const userSchema = mongoose.model('userSchema', UserSchema);

module.exports = userSchema;
