var _ = require('underscore');
var express = require('express');
var nunjucks = require('nunjucks');

function Page(req, res) {
	var page = this;
	this.req = req;
	this.res = res;
	this.globals = {};
	this.render = function(template, locals, callback) {
		var vars = _.clone(page.globals);
		if (locals !== undefined)
			_.extend(vars, locals);
		vars.page = page;
		return Page.render(template, vars, callback);
	};
	this.send = function(template, locals) {
        page.render(template, locals, function(err, result) {
            if (err) {
                
                // page.res.status(500);
                // page.res.send(err);
                throw err;
            } else {
                page.res.send(result);
            }
        });
	};
    return this;
};

Page.globals = {};
Page.render = function(template, locals, callback) {
	var vars = _.clone(Page.globals);
	if (locals !== undefined)
		_.extend(vars, locals);
	return Page.nunjucks.render(template, vars, callback);
};
Page.configure = function(config) {
    Page.nunjucks = new nunjucks.Environment(new nunjucks.FileSystemLoader(config.templatePath));
    return true;
};

Page.middleware = new express.Router();

Page.middleware.use(function(req,res,next) {
	res.page = new Page(req,res);
	next();
});

module.exports = Page;
