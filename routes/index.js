const
    express = require('express'),
    sourceServices = require('../services/source');

var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    let sources = sourceServices.get();

    res.render('index', { title: 'Express', sources });
});

module.exports = router;