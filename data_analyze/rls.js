// Recursive Least Square, adaptive filter algorithm
// https://en.wikipedia.org/wiki/Recursive_least_squares_filter

var math = require('mathjs');

function FinitQueue(size) {
    this.size = size;
    this.queue = [];
}

FinitQueue.prototype.push = function (e) {
    if (this.queue.length < this.size) {
        this.queue.push(e);
        return null;
    } else {
        this.queue.push(e);
        return this.queue.shift();
    }
}

// size: the window size
// lamda: the learning rate
// delta: the initial value of variance matrix
function RLS(size, lamda, delta) {
    this.size = size;
    this.lamda = lamda;
    this.delta = delta;
    // the weight
    this.W = math.zeros(size);
    // the variance
    this.P = math.multiply(math.identity(size), 1.0 / delta);
}

RLS.prototype.init = function (W0, P0) {
    this.W = W0;
    this.P = P0;
}

// use input x and expect output d to update W
RLS.prototype.update = function (x, d) {
    // calc the error
    var alpha = d - math.multiply(math.transpose(x), this.W);
    // calc the gain of error
    var g = math.multiply(math.multiply(this.P, x), 1 / (this.lamda + math.multiply(math.multiply(math.transpose(x), this.P), x)));
    // udpate the variance
    this.P = math.multiply(math.subtract(this.P, math.multiply(math.multiply(g, math.transpose(x)), this.P)), 1 / this.lamda);
    // udpate the weight
    this.W = math.add(this.W, math.multiply(alpha, g));
    return alpha;
}

RLS.prototype.estimate = function (x) {
    return math.multiply(math.transpose(this.W), x);
}

function AnormalDetection(size, lamda, delta, threshold) {
    // the time delay to start detection
    this.delay = size;
    this.queue = new FinitQueue(size);
    this.rls = new RLS(size, lamda, delta);
    this.threshold = threshold;
}

// detect
AnormalDetection.prototype.detect = function (input) {
    var x = math.matrix(this.queue.queue);
    var out = this.queue.push(input);
    this.delay--;
    if (out != null) {
        // delay to start detection for convergence
        if (this.delay < 0) {
            var est = this.rls.estimate(x);
            var error = this.rls.update(x, input);
            if (math.abs(error) > this.threshold)
                console.log("Anormal found the input is " + input);
        }
    }
}


var detector = new AnormalDetection(5, 0.01, 5, 10);
for (var i = 0; i < 100; i++) {
    var input = i;
    if (i % 10 == 0)
        input = 2 * i;
    detector.detect(input);
}