import { NextFunction, Request, Response } from 'express';
import { IJWTPayload } from 'jetti-middle';
import * as jwt from 'jsonwebtoken';
import * as SocketIO from 'socket.io';
import { JTW_KEY } from '../../env/environment';

export function authHTTP(req: Request, res: Response, next: NextFunction) {
  const token = ((req.headers.authorization as string) || '').split(' ')[1];
  jwt.verify(token, JTW_KEY as string, undefined, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Auth failed:' + error });
    (<any>req).user = decoded;
    next();
  });
}

export function authIO(socket: SocketIO.Socket, next: NextFunction) {
  const token = socket.handshake.query['token'] as string;
  jwt.verify(token, JTW_KEY as string, undefined, (error, decoded: IJWTPayload) => {
    if (!error) socket.handshake.query['user'] = decoded.email;
    next();
  });
}
