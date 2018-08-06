const mongoose = require('mongoose');
let users = mongoose.model('User', {
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = {
    users
}