var province = require('./province');
var school = require('./school');
var dict = require('./dict');
var fs = require('fs');

var json;

var allArr = [];
var prArr = [];
var item = [];

var prcode, obj;

console.log('start');

for(var key in school){//province loop
    prcode = school[key][0];
    prArr.length = 0;
    school[key][1].forEach(function(vs, ks){//school loop
        item.length = 0;
        dict[prcode].forEach(function(vd, kd){//dict loop
            if(vd[0] == vs){
                item.push(vd[1]);
            }
        });
        obj = {};
        obj[vs] = item;
        prArr.push(obj);
    });
    obj = {};
    obj[school[key][0]] = prArr;
    allArr.push(obj);
};

json = JSON.stringify(allArr);

console.log(json);

fs.writeFile('./json/gen.json', json, function(err){
    if(err)
        throw err;
    console.log('saved');
});