var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello MQTT');
});

client.on('message', function (topic, message) {
    // message is buffer
    console.log(message.toString());
    client.end();
});