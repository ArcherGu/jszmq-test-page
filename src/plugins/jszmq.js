import * as zmq from 'jszmq';
const TIMEOUT = 5000;

export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    }
}

export function sendRequestMsg(url, msg) {
    var sock = zmq.socket("req");
    sock.connect("ws://" + url);
    sock.send(msg);
    let isTimeout = false;

    const delSock = _ => {
        if (
            typeof sock.removeAllListeners == 'function' &&
            typeof sock.close == 'function'
        ) {
            sock.removeAllListeners('message');
            sock.close();
        }
    };

    const promise = new Promise((resolve, reject) => {
        sock.once("message", function (message) {
            if (isTimeout) {
                delSock();
                return;
            }

            try {
                delSock();
                resolve(message.toString("utf8"));
            } catch (error) {
                delSock();
                reject(error);
            }
        });
    });

    const timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            isTimeout = true;
            delSock();
            resolve({
                error: 'request timeout'
            });
        }, TIMEOUT);
    });

    return Promise.race([promise, timeoutPromise]);
}

export function subSomeTopic(url, subTopic, callback) {
    var sock = zmq.socket("sub");
    sock.connect("ws://" + url);
    sock.subscribe(subTopic);

    sock.on("message", function (topic, message) {
        try {
            if (topic.toString("utf8") == subTopic) {
                callback(message.toString("utf8"), topic.toString("utf8"));
            }
        } catch (error) {
            console.log(error);
        }
    });

    return sock;
}