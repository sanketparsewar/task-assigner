const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['worker', 'admin'],
    }
}, { timeStamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User;
