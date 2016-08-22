var arr = [];
var subArr = [];
var obj = {};

obj['name'] = 'a';

subArr.push(obj);
arr.push(subArr);

obj['name'] = 'b';

console.log(arr);
console.log(subArr);


var numArr = [];
for(var i = 0; i < 5; i++){
    numArr.push(i);
}

console.log(numArr);

var objArr = [];
for(var i = 0; i < 5; i++){
    obj = {};
    obj = {id:i};
    objArr.push(obj);
}

console.log(objArr);