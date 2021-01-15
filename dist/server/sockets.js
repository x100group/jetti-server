"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocketsEmit = void 0;
const index_1 = require("./index");
function userSocketsEmit(user, event, payload) {
    try {
        index_1.IO.emit(event, payload);
        /*     if (!(user && user.email)) {
              // IO.emit(event, payload);
            } else {
              Object.keys(IO.sockets.connected).forEach(k => {
                const socket = IO.sockets.connected[k];
                if (socket.connected && socket.handshake.query.user === user.email) socket.emit(event, payload);
              });
            }*/
    }
    catch (err) {
        console.error('socket err', err);
    }
}
exports.userSocketsEmit = userSocketsEmit;
//# sourceMappingURL=sockets.js.map