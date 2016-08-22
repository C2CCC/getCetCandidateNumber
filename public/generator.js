/*
This file is used for creating school-code map json data 
*/

// var province = require('./province');
var school = require('./school');
var dict = require('./dict');
var fs = require('fs');

var json;

// var allArr = [];
var allObj = {};
var prArr = [];
var prObj = {};
var item = [];

var prcode, obj;

for(var key in school){//province loop
    prcode = school[key][0];
    prArr = new Array();
    school[key][1].forEach(function(vs, ks){//school loop
        item = new Array();
        dict[prcode].forEach(function(vd, kd){//dict loop
            if(vd[0] == vs && item.indexOf(vd[1]) == -1){
                item.push(vd[1]);
            }
        });
        // obj = new Object();
        // obj[vs] = item;
        // prArr.push(obj);
        prObj = new Object();
        prObj[vs] = item;
    });
    // obj = new Object();
    // obj[school[key][0]] = prArr;
    // allArr.push(obj);
    allObj[school[key][0]] = prObj;
};

json = JSON.stringify(allObj);

// console.log(json);

fs.writeFile('./json/gen.json', json, function(err){
    if(err)
        throw err;
    console.log('saved to file ./json/gen.json');
});