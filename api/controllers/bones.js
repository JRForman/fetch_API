'use strict';
var User = require('../../models/users');
var Site = require('../../models/site');

module.exports = {
    addBones: function (req, res) {
        var { id, siteName, typeOf, googleID, website, phone, image, address, bones, voteCount } = req.swagger.params.site.value || "Not defined";
        if ((bones === undefined) || (siteName === undefined)) {
            var err = { "message": "Incorect body" };
            res.status(500).json(err).end();
            return;
        }
        if (bones < 0 || bones > 5) {
            var err = { "message": "Review out of range" };
            res.status(500).json(err).end();
            return;
        }
        Site.findOne({ siteName }, function (err, site) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }
            var currentBones = site.bones;
            var currentCount = site.voteCount;
            var currentTotal = currentBones * currentCount;
            var newBones = ((bones + currentTotal) / (currentCount + 1)).toFixed(2);
            var newCount = currentCount + 1;
            site.bones = newBones;
            site.voteCount = newCount;
            site.save();
        }).then(function () {
            res.status(200).json({ "message": "Update successful" }).end();;
        }
        );
    },

    takeBones: function (req, res) {
        // console.log(req.swagger.params)
        var { id, siteName, typeOf, googleID, website, phone, image, address, bones, voteCount } = req.swagger.params.site.value || "Not defined";
        if ((bones === undefined) || (siteName === undefined)) {
            var err = { "message": "Incorect body" };
            res.status(500).json(err).end();
            return;
        }
        if (bones < 0 || bones > 5) {
            var err = { "message": "Review out of range" };
            res.status(500).json(err).end();
            return;
        }
        Site.findOne({ siteName }, function (err, site) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }
            var currentBones = site.bones;
            var currentCount = site.voteCount;
            var currentTotal = currentBones * currentCount;
            var newBones = ((currentTotal - bones) / (currentCount - 1)).toFixed(2);
            var newCount = currentCount - 1;
            site.bones = newBones;
            site.voteCount = newCount;
            site.save();
        }).then(function () {
            res.status(200).json({ "message": "Update successful" }).end();;
        }
        );
    }
}