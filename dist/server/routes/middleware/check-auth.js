"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authIO = exports.authHTTP = void 0;
const jwt = require("jsonwebtoken");
const environment_1 = require("../../env/environment");
function authHTTP(req, res, next) {
    const token = (req.headers.authorization || '').split(' ')[1];
    jwt.verify(token, environment_1.JTW_KEY, undefined, (error, decoded) => {
        if (error)
            return res.status(401).json({ message: 'Auth failed:' + error });
        req.user = decoded;
        next();
    });
}
exports.authHTTP = authHTTP;
function authIO(socket, next) {
    const token = socket.handshake.query['token'];
    jwt.verify(token, environment_1.JTW_KEY, undefined, (error, decoded) => {
        if (!error)
            socket.handshake.query['user'] = decoded.email;
        next();
    });
}
exports.authIO = authIO;
//# sourceMappingURL=check-auth.js.map