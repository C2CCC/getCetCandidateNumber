var express = require('express');
var Query = require('./query');
var router = express.Router();
var schoolCode = require('../json/gen');

/* GET home page. */
router.post('/', function(req, res, next) {
    var zkzh, xm, province, school, type, classroom, year;
    if(req.body.number){
        zkzh = req.body.number;
        xm = req.body.name;
        query(zkzh, xm, -1);
    } else {
        province = req.body.province;
        school = getSchoolCode(province, req.body.school);
        type = req.body.type;
        classroom = req.body.classroom;
    }
});

function query(zkzh, xm, seat){
    var q = new Query(zkzh, xm);
    q.sendRequest().then(function(result){
        console.log(result);
        if(result.success && seat < = 30){
            res.render('find', {
                name: result.name,
                school: result.school,
                type: result.type,
                number: result.number,
                time: result.time,
                score: result.score
            });
        } else {
            query()
        }
    }, function(err){
        console.log(err);
    }).catch(function(err){
        console.log(err);
    });
}

function getSchoolCode(province, school){

}


module.exports = router;
