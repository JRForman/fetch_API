'use strict';
var User = require('../../models/users');
var Site = require('../../models/site');
var Comments = require('../../models/comments');
var parsePhone = require('libphonenumber-js');

module.exports = {


    postNewSite: function (req, res) {
        console.log("--------------------------------------");
        var { siteName, typeOf, googleID, website, phone, image, address, bones, voteCount } = req.swagger.params.site.value;
        phone = parsePhone.formatNumber({ country: 'US', phone: phone }, 'National');
        var site = new Site({ siteName, typeOf, googleID, website, phone, image, address, bones, voteCount });
        site.save().then(function () {
            console.log("save successful");
            res.json({
                siteName,
                typeOf,
                googleID,
                website,
                phone,
                image,
                address,
                bones,
                voteCount
            }).end();
        },
            function (err) {
                console.log(err);
                if (err) {
                    res.status(500).json({ "message": err }).end();
                    return;
                }
            }
        );
    },
    deleteSite: function (req, res) {
        console.log("--------------------------------------");
        var { siteName, typeOf, googleID, website, phone, image, address, bones, voteCount } = req.swagger.params.site.value;
        phone = parsePhone.formatNumber({ country: 'US', phone: phone }, 'National');
        var site = { siteName, typeOf, googleID, website, phone, image, address, bones, voteCount };
        Site.findOne({ site })
            .remove()
            .exec(function (err) {
                console.log(err);
                if (err) {
                    res.status(500).json({ "message": err }).end();
                    return;
                }
                res.status(200).json({"message":"delete successfyl"}).end();
            }
            );
    },

    searchSites: function (req, res) {
        // var {zip, typeOf, bones } = req.swagger.params.typeOf.value || null;
        var typeOf = req.swagger.params.typeOf.value || null;
        var zip = req.swagger.params.zip.value || null;
        var bones = req.swagger.params.bones.value || null;

        var query = {};
        if (typeOf) { query.typeOf = typeOf.toUpperCase() };
        if (zip) { query["address.zip"] = zip }
        if (bones) { query.bones = bones };
        Site.find(query)
        .populate("comments")
        .exec(function (err, sites) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }
            if (sites) {
                res.json({
                    sites: sites
                }).end();
            }
        })
    }
}
