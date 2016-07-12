var port = 9000
var gpio = require('gpio')
var motor = require('./module/motor')
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: port })

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        var msg = JSON.parse(message)
console.log(msg.module)
        switch (msg.module) {
            case 'motor':
                motor.handler(msg.action, msg.options)
                break
        }
    });
});
