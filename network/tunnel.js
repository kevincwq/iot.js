// localtunnel.me
// npm install -g localtunnel
// lt --port 8000

// https://github.com/localtunnel/localtunnel

var localtunnel = require('localtunnel');

var tunnel = localtunnel(port, function (err, tunnel) {
    if (err) {}

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url;
});

tunnel.on('close', function () {
    // tunnels are closed
});