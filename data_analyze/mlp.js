var synaptic = require('synaptic');
var Network = synaptic.Network;
var Layer = synaptic.Layer;
var Trainer = synaptic.Trainer;

// Multilayer Perceptron, MLP
function Perceptron(input, hiddens, output) {
    var inputLayer = new Layer(input);
    var outputLayer = new Layer(output);
    if (!Array.isArray(hiddens) && Number.isSafeInteger(hiddens)) {
        hiddens = [hiddens];
    }

    var hiddenLayers = [];
    hiddens.forEach(hidden => {
        hiddenLayers.push(new Layer(hidden));
    });

    if (hiddenLayers.length > 0) {
        inputLayer.project(hiddenLayers[0]);
        for (var i = 0; i < hiddenLayers.length - 1; i++) {
            hiddenLayers[i].project(hiddenLayers[i + 1]);
        }
        hiddenLayers[hiddenLayers.length - 1].project(outputLayer);
    } else {
        inputLayer.project(outputLayer);
    }

    this.set({
        input: inputLayer,
        hidden: hiddenLayers,
        output: outputLayer
    });
}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

// Backpropagation, BP
var mlp = new Perceptron(2, [3, 2], 1);
var trainer = new Trainer(mlp);

// train XOR
var trainingSet = [{
        input: [0, 0],
        output: [0]
    },
    {
        input: [0, 1],
        output: [1]
    },
    {
        input: [1, 0],
        output: [1]
    },
    {
        input: [1, 1],
        output: [0]
    },
];

trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 200000,
    log: 1000
});

// test
console.log(mlp.activate([0, 0]));
console.log(mlp.activate([1, 0]));
console.log(mlp.activate([0, 1]));
console.log(mlp.activate([1, 1]));