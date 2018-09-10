'use strict';
var User = require('../../models/users');
var Site = require('../../models/site');
var Comments = require('../../models/comments');
var parsePhone = require('libphonenumber-js');
var mongoose = require('mongoose');


module.exports = {
    addComment: function (req, res) {
        var { _id, siteName, typeOf, googleID, website, phone, image, address, bones, voteCount, comments, user } = req.swagger.params.comment.value;
        if(!user){user = "Anonymous"}
        Comments.create({ comments, user })
            .then(function (comments) {
                return Site.findOneAndUpdate({ siteName }, { $push: { comments: comments._id } }, { new: true });
            })
            .then(function () {
                res.json({ "message": "Added comment" });
            })
            .catch(function (err) {
                res.json(err);
            });
    },

    deleteComment: function (req, res) {
        var id = mongoose.Types.ObjectId(req.swagger.params.comment.value.id)

        Comments.deleteOne({ _id: id })
            .then(function () {
                Site.findOneAndUpdate({ comments: id }, { $pull: { comments: id } })
                    .then(function (site) {
                        res.json({ "message": "Deleted comment" });
                    }).catch(function (err) {
                        res.json(err);
                    });
            });
    }
}