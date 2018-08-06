const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'email is not valid!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            requred: true
        },
        token: {
            type: String,
            requred: true
        }
    }],
    status: {
        type: String,
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, 'artemio').toString();

    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
}

let Users = mongoose.model('Users', UserSchema);

module.exports = {
    Users
}