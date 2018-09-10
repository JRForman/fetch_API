var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var typeOfArray = ["RESTAURANT", "PARK", "BAR", "ACTIVITY", "RENTAL", "HOTEL"]

module.exports = mongoose.model('Site', new mongoose.Schema({
    siteName: {
        type: String,
        require: true
    },
    typeOf: {
        type: String,
        uppercase: true,
        require: true,
        enum: typeOfArray
    },
    googleID: {
        type: String,
        require: false
    },
    website: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    },
    address: {
        street: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            uppercase: true,
            require: true,
            enum: statesArray
        },
        zip: {
            type: Number,
            require: true
        },
    },
    paws: {
        type: Number,
        require: true,
        default: 0
    },
    voteCount: {
        type: Number,
        require: true,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        require: false
    }]
}
));



