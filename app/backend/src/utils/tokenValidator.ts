import { Request, Response, NextFunction } from 'express';
import Authenticator from './auth';

const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const isValid = await Authenticator.validateToken(authorization);
  res.locals.data = isValid;

  if (isValid === 'Token must be a valid token') {
    return res.status(401).json({ message: isValid });
  }

  next();
};

export default tokenValidator;
