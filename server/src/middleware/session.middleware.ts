import { Handler, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { signInPath, createPath } from '../controller/user.controller';
import { AuthService } from '../service/auth.service';

export const UNPROTECTED_ROUTES = [signInPath, createPath];

export const sessionMiddleware: Handler = (req: Request, res: Response, next) => {
  const token = req.headers['x-access-token'];

  if (UNPROTECTED_ROUTES.includes(req.url)) {
    next();
  } else if (typeof token === 'string') {
    AuthService.isSessionValid(token).then(valid => {
      verify(token, process.env.SECRET, function (err, decoded) {
        if (err || !valid) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        if (!(typeof decoded === 'string')) {
          req.userId = +decoded.sub;
        }

        next();
      });
    })
  } else {
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }
}