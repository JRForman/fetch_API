'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
var bluebird = require('bluebird');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 8080;
  mongoose.Promise = bluebird;
  mongoose.connect('mongodb://localhost/userList');
  mongoose.connection.on('error', console.error.bind(console, 'connection errror:'))
  mongoose.connection.once('open', function(){
    app.listen(port);

  })

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});
