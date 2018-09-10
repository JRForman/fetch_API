'use strict';
var User = require('../../models/users');
var Site = require('../../models/site');
var Comments = require('../../models/comments');
var parsePhone = require('libphonenumber-js');


module.exports = {
    addComment: function (req, res) {
        var site = req.swagger.params;
        console.log(site);
        var { id, siteName, typeOf, googleID, website, phone, image, address, bones, voteCount, comments } = req.swagger.params.comment.value;
        Comments.create({comments})
            .then(function (comments) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return Site.findOneAndUpdate({ siteName }, { $push: { comments: comments._id } }, { new: true });
            })
            .then(function () {
                // If we were able to successfully update an Article, send it back to the client
                res.json({"message":"Update comment"});
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    },
    // addComment: function (req, res) {
    //     var site = req.swagger.params;
    //     console.log(site);
    //     var { id, siteName, typeOf, googleID, website, phone, image, address, bones, voteCount, comments } = req.swagger.params.comment.value;
    //     Comments.create({comments})
    //         .then(function (comments) {
    //             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    //             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    //             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //             return Site.findOneAndUpdate({ siteName }, { $push: { comments: comments._id } }, { new: true });
    //         })
    //         .then(function () {
    //             // If we were able to successfully update an Article, send it back to the client
    //             res.json({"message":"Update comment"});
    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             res.json(err);
    //         });

    // }
}