const zmq = require('jszmq');
const dayjs = require('dayjs');

var repSock = zmq.socket("rep");
repSock.bind("ws://127.0.0.1:8083");

repSock.on("message", function (message) {
    repSock.send(dayjs().format('YYYY-MM-DD HH:mm:ss') + " Back:" + message.toString("utf8"));
});

var pubSock = zmq.socket("pub");
pubSock.bind("ws://127.0.0.1:8084");

setInterval(_ => {
    var msg = dayjs().format('YYYY-MM-DD HH:mm:ss') + ': Wow!';
    console.log(msg);
    pubSock.send(['MyTopic', msg]);
}, 5000);
