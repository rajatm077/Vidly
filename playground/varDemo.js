'use strict';

function myfn() {
  console.log(arguments.length);
  console.log(arguments);
}
myfn(1,2,3, null, [1,2,3], {"a": "abcd"});

var red = [1,2,2,4].reduce((a, b) => a*b);
console.log(red);