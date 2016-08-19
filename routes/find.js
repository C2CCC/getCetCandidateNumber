var express = require('express');
var Query = require('./query');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var q = new Query('351010161106902', '%E9%83%91%E5%AE%B6%E5%85%B4');
    q.sendRequest().then(function(data){
        console.log(data);
        res.send(data);
    }, function(err){
        console.log(err);
    }).catch(function(err){
        console.log(err);
    });
    
});



module.exports = router;
