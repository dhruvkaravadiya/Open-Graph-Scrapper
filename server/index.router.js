var express = require('express');
var router = express.Router();

const fs = require('fs');
const DIR = __dirname + '/files';

const allowedUrls = fs.readdirSync(DIR);
const validUrls = allowedUrls.map(url => url.replace('.html', ''));

/* GET home page. */
router.get('/:url', function (req, res, next) {
    if (validUrls.indexOf(req.params.url) !== -1) {
        res.sendFile(DIR + `/${req.params.url}.html`);
    } else {
        res.status(404).send();
    }
});


module.exports = router;
