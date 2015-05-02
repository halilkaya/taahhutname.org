var express = require('express');
var sass = require('node-sass');
var Cache = require('./lib/cache');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var router = new express.Router();

/*

	ASSETS

*/

var scss = new Cache({
	generator: function(cb) {
		sass.render({
    		file: __dirname + '/assets/style.scss'
  		}, cb);
	},
	ttl: 60,
	// eager: true // this will keep refreshing in background
});
router.get('/assets/style.css', function(req, res) {
	scss.promise()
	.then(function(data) {
		res.setHeader("Content-Type", "text/css");
		res.send(result.css);
	});
});
router.use('/assets', express.static('assets'));

/*

	DATA

*/
var dataController = {};
var perpage = 12;

dataController.cache = new Cache({
	promise: function() {
		return fs.readFileAsync('data/data.json')
		.then(function(data) {
			return JSON.parse(data);
		});
	},
	ttl: 10,
	// eager: true // this will keep refreshing in background
});
dataController.getPage = function(page) {
	return dataController.cache.promise()
	.then(function(data) {
		return data.splice(page * perpage, perpage);
	});
};
dataController.getPaginationInfo = function(page) {
	return dataController.cache.promise()
	.then(function(data) {
		return {
			current: page,
			countOnPage: data.length - (perpage * page),
			count: data.length,
			pages: Math.ceil(data.length / perpage)
		};
	});
};
dataController.search = function(keyword, page) {
	return {
		data: [],
		pagination: {
			search: search,
			current: page,
			count: 0,
			countOnPage: 0,
			pages: 0
		}
	};
};

/*

	ERROR PAGE

*/
router.use(function(err, req, res, next) {
	console.error(err.stack);
	// res.status(500).send('Something broke!');
	return res.status(500).page.send('error.html', {
		error: {
			code: 500,
			message: 'Bir Hata Oluştu',
			description: 'En kısa zamanda düzelteceğiz'
		}
	});
});


/*

	DYNAMIC PAGES

*/
router.get('/liste', function(req,res) {
	Promise.props({
		currentPage: 0,
		list: dataController.getPage(0),
		pagination: dataController.getPaginationInfo(0)
	}).then(function(context) {
		res.page.send('list.html', context);
	});

});
router.get('/liste/sayfa/:page', function(req,res) {
	Promise.props({
		currentPage: req.params.page - 1,
		list: dataController.getPage(req.params.page - 1),
		pagination: dataController.getPaginationInfo(0)
	}).then(function(context) {
		// setTimeout(function() { // was a loading animation test
			res.page.send('list.html', context);
		// }, 3000);
	});
});
router.search('/liste/arama/:keyword', function(req,res) {
	Promise.props({
		currentPage: 0,
		searchKeyword: req.params.keyword,
		list: dataController.search(req.params.keyword, 0).data,
		pagination: dataController.search(req.params.keyword).pagination
	}).then(function(context) {
		res.page.send('list.html', context);
	});
});
router.search('/liste/arama/:keyword/sayfa/:page', function(req,res) {
	Promise.props({
		currentPage: req.params.page - 1,
		searchKeyword: req.params.keyword,
		search: dataController.search(req.params.keyword, req.params.page - 1)
	}).then(function(context) {
		context.list = search.data;
		context.pagination = search.pagination;
		res.page.send('list.html', context);
	});
});

/*

	STATIC PAGES

*/
var indexCounter = 0;
router.get(/\/(index(\.html)?)?$/, function(req, res) {
	var counterValue = indexCounter;
	indexCounter++;
	console.log("Getting Index #" + counterValue);
	Promise.props({
		currentPage: 0,
		list: dataController.getPage(0),
		pagination: dataController.getPaginationInfo(0)
	})
	.then(function(context) {
		console.log("\t Done #" + counterValue);
		res.page.send('content.html', context);
	});
});

/*

	404

*/
router.use(function(req, res) {
	res.page.send('error.html', {
		error: {
			code: 404,
			message: 'Sayfa Bulunamadı',
			description: 'Geldiğiniz linki kontrol ediverin.'
		}
	});
});

module.exports = router;
