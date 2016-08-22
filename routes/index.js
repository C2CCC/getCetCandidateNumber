var express = require('express');
var router = express.Router();
var province = require('../public/json/province');
var school = require('../public/json/school');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CCC passed the cet hahaha', province: province, school: school });
});

module.exports = router;
