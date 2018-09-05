var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String
}));