# iot.js
The code snippets of node.js for IoT

## Useful NPM packages
- microtime
- ffi: node-ffi is used to call C/C++ functions
- coap: CoAP protocol support
- nodemon: monitor and reload modules
- node-zookeeper-client: register and discovery service
- IoT.js from Samsung
- Espruino
- kafka-node: Producer and consumer for Kafka
- kafka-rest: Kafka RESTful client
- EclairJS, Nashorn: Spark JS support


## Debug Tools
``` bash
# profile application
node --prof app.js

# analyze the profile log file
node --prof-process isolate-xxxxxxxxxx-v8.log

# GC trace
node --trace-gc app.js

# Watch ./app and ./libs directories for code update
nodemon --watch app --watch libs app/server.js

```
