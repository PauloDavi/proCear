// Middleware de autenticação por jwt

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Ao autenticar o usuario seta o parametro do id e se o usuario é um administrador
    req.UserId = decoded.id;
    req.UserAdmin = decoded.admin;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
