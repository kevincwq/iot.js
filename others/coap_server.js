var coap = require('coap');
var server = coap.createServer();

server.on('request', function (req, res) {
    console.log(req.url);
    res.end('Hello ' + req.url.split('/')[1] + '\n');
});

// the default CoAP port is 5683
server.listen(function () {
    console.log('Server started');
});