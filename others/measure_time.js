var microtime = require('microtime');
var t1 = microtime.now();
console.time('ct1');

var delay = microtime.now() - t1;
console.timeEnd('ct1');

console.log('now: ' + t1 + ' delay: ' + delay);
