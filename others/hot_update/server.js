var express = require('express');
var fs = require('fs');
var app = express();
var router = require('./app.js');
var port = 8080;
app.use(function (req, res, next) {
    // Use closure to prevent router is cached by app.use
    router(req, res, next);
});
app.listen(port);
console.log("Server at port " + port);

// watch the files
fs.watch(require.resolve('./app.js'), function () {
    cleanCache('./app.js');
    try {
        router = require('./app.js');
    } catch (ex) {
        console.error('module update failed');
    }
});

function cleanCache(modulePath) {
    var path = require.resolve(modulePath);
    var module = require.cache[path];
    // remove reference in module.parent to prevent memory leak
    if (module && module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[path] = null;
}

// trig to test the memory leak
// setInterval(function () {
//     var code = require('./app.js');
//     cleanCache('./app.js');
// }, 10);

