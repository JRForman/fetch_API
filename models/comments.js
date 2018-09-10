var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.model('Comments', new mongoose.Schema({
    user: String,
    comments: String
}));