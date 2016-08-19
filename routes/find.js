var express = require('express');
var Query = require('./query');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var zkzh, xm, province, school, type, classroom;
    if(req.body.number){
        zkzh = req.body.number;
        xm = req.body.name;
    }
    var q = new Query(zkzh, xm);
    q.sendRequest().then(function(result){
        console.log(result);

        res.render('find', {
            name: result.name,
            school: result.school,
            type: result.type,
            number: result.number,
            time: result.time,
            score: result.score
        });
    }, function(err){
        console.log(err);
    }).catch(function(err){
        console.log(err);
    });
    
});



module.exports = router;
