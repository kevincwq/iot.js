// NODE_DEBUG=cluster node cluster_server.js


// server side
var cluster = require('cluster');
var net = require('net');
var numCpus = require('os').cpus().length;

// console.log('CPUs: ' + numCpus);

if (cluster.isMaster) {
    for (var i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // process TCP connection on worker node, and all the worker process share the same TCP connection
    // the following code is same as single process server
    var server = net.createServer(function (c) {
        // 'connection' listener
        console.log('client connected');
        c.on('end', function () {
            console.log('client disconnected');
        });
        c.write('hello\n');
        c.pipe(c);
    });
    server.listen(8124, function(){
        // start linstener
        console.log('server bound');
    });
}