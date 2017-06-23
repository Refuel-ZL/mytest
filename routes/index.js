var express = require('express');
var router = express.Router();
var logger = require("../module/logHelper").helper;
/* GET home page. */
router.get('/', function(req, res, next) {
    var user = {
        name: "Chen-xy",
        age: "22",
        address: "bj"
    }
    req.session.user = user;
    logger.writeInfo(user)
    res.render('index', {
        title: 'the test for nodejs session',
        name: 'sessiontest'
    });
    // res.render('index', { title: 'Express' });
});

module.exports = router;
