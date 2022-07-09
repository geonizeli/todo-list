import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { apiNamespace as userControllerNamespace } from '../controller/user.controller';
import { AuthService } from '../service/auth.service';

export const isRouteUnprotected = (path: string) => {
  return path.startsWith(userControllerNamespace)
}

export const sessionMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (isRouteUnprotected(req.url)) {
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