var express = require('express');
var Query = require('./query');
var router = express.Router();
var schoolCode = require('../public/json/gen');

/* GET home page. */
router.post('/', function(req, res, next) {
    var zkzh, xm, province, schoolArr, type, classroom, seat, year, time, prefix, candidate, canArr = [], result, success = false;
    var interval = 1;
    xm = req.body.name;
    if(req.body.number){
        zkzh = req.body.number;
        query(zkzh, xm).then(function(result){
            renderer(result);
        },function(err){
            console.log(err);
        }).catch(function(err){
            console.log(err);
        });
    } else {
        province = req.body.province;
        schoolArr = getSchoolCode(province, req.body.school);
        type = req.body.type;
        classroom = req.body.classroom;
        year = ((new Date()).getFullYear()) % 100;
        time = ((new Date()).getMonth()) > 5? 1 : 2;

        schoolArr.forEach(function(value, key){
            prefix = value.toString() + year.toString() + time.toString() + type.toString();
             for(var i = 0; -i <= interval; i = -i){
                var c = prefixNumberZero(parseInt(classroom) + i, 3);
                for(seat = 0; seat <= 30; seat++){
                    var s = prefixNumberZero(seat, 2);
                    candidate = prefix + c.toString() + s.toString();
                    canArr.push(candidate);
                }

                if(i >= 0){
                    i++;
                }
             }
        });

        canArr.forEach(function(can, key){
            query(can, xm).then(function(result){
                // console.log('result');
                if(result.success){
                    success = true;
                    renderer(result);
                }
            },function(err){
                console.log(err);
            }).catch(function(err){
                console.log(err);
            });
        });

        if(!success){
            renderer({ success: false, name: '未找到对应分数' });
        }
    }

    function renderer(result){
        res.render('find', {
            name: result.name,
            school: result.school,
            type: result.type,
            number: result.number,
            time: result.time,
            score: result.score
        });
    }
});

function query(zkzh, xm){
    return new Promise(function(resolve, reject){
        var q = new Query(zkzh, xm);
        q.sendRequest().then(function(result){
            // console.log(result);
            resolve(result);
        }, function(err){
            console.log(err);
            reject(err);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}

function getSchoolCode(province, school){
    return schoolCode[province][school];
}

function prefixNumberZero(num, n){
    return Array(n - ('' + num).length + 1).join(0) + num;
}


module.exports = router;
