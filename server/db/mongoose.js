const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true });

module.exports = {
    mongoose
}