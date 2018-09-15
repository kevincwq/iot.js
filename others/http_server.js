var http = require('http');
var url = require('url');
var path = require('path');
var port = 8080;

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (path.basename(pathname) === "echo") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ message: "Hello World" }));
    }
}).listen(port);
console.log("Server at port " + port);
