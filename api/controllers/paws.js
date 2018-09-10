'use strict';
var User = require('../../models/users');
var Site = require('../../models/site');

module.exports = {
    addpaws: function (req, res) {
        var { id, siteName, typeOf, googleID, website, phone, image, address, paws, voteCount } = req.swagger.params.site.value || "Not defined";
        if ((paws === undefined) || (siteName === undefined)) {
            var err = { "message": "Incorect body" };
            res.status(500).json(err).end();
            return;
        }
        if (paws < 0 || paws > 5) {
            var err = { "message": "Review out of range" };
            res.status(500).json(err).end();
            return;
        }
        Site.findOne({ siteName }, function (err, site) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }
            var currentpaws = site.paws;
            var currentCount = site.voteCount;
            var currentTotal = currentpaws * currentCount;
            var newpaws = ((paws + currentTotal) / (currentCount + 1)).toFixed(2);
            var newCount = currentCount + 1;
            site.paws = newpaws;
            site.voteCount = newCount;
            site.save();
        }).then(function () {
            res.status(200).json({ "message": "Update successful" }).end();;
        }
        );
    },

    takepaws: function (req, res) {
        // console.log(req.swagger.params)
        var { id, siteName, typeOf, googleID, website, phone, image, address, paws, voteCount } = req.swagger.params.site.value || "Not defined";
        if ((paws === undefined) || (siteName === undefined)) {
            var err = { "message": "Incorect body" };
            res.status(500).json(err).end();
            return;
        }
        if (paws < 0 || paws > 5) {
            var err = { "message": "Review out of range" };
            res.status(500).json(err).end();
            return;
        }
        Site.findOne({ siteName }, function (err, site) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }
            var currentpaws = site.paws;
            var currentCount = site.voteCount;
            var currentTotal = currentpaws * currentCount;
            var newpaws = ((currentTotal - paws) / (currentCount - 1)).toFixed(2);
            var newCount = currentCount - 1;
            site.paws = newpaws;
            site.voteCount = newCount;
            site.save();
        }).then(function () {
            res.status(200).json({ "message": "Update successful" }).end();;
        }
        );
    }
}