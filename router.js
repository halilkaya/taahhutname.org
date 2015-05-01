var express = require('express');
var fs = require('fs');
var sass = require('node-sass');

var router = new express.Router();

/*

	ASSETS

*/

// TODO : Return a cache header, and MAKE SURE NGINX CACHES THIS!
router.get('/assets/style.css', function(req, res) {
  sass.render({
    file: __dirname + '/assets/style.scss'
  }, function(err, result) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.setHeader("Content-Type", "text/css");
      res.send(result.css);
    }
  });
});
router.use('/assets', express.static('assets'));

/*

	DYNAMIC PAGES

*/


/*

	STATIC PAGES

*/
router.get(/\/(index(\.html)?)?$/, function(req, res) {
	res.page.send('content.html');
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
