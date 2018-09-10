'use strict';

var User = require('../../models/users');

module.exports = {
    listUsers: function (req, res) {
        User.find({ "name": { $ne: null } }, function (err, users) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }

            res.json({
                users: users
            }).end();
        });
    },

    createUser: function (req, res) {
        console.log("----------------------------------------------------------");
        console.log(req.swagger.params.user.value);

        var user = new User(req.swagger.params.user.value);
        user.save(function (err) {
            if (err) {
                res.status(500).json(err).end();
                return;
            }

            res.json({
                user: user
            }).end();
        })
    }


}