var coap = require('coap');

var req = coap.request('coap://localhost/iot');
req.on('response', function(res){
    res.pipe(process.stdout);
});
req.end();