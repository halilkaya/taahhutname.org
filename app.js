var express = require('express');
var _ = require('underscore');
var matter = require('gray-matter');
var Path = require('path');
var config = {
  port: 8080
};
var Page = require('./lib/page');
Page.configure({
  controllerPath: __dirname + '/pages',
  templatePath: __dirname + '/html'
}); // folder

// HTTP Server & Pipeline
var app = express();
app.use('/js', express.static('assets/js'));
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));
app.use(Page.middleware);
app.use(require('./router'));
app.listen(config.port);
