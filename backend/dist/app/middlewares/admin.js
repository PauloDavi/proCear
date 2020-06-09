"use strict";Object.defineProperty(exports, "__esModule", {value: true});// Middleware que verifica se o usuário é um administrador

exports. default = async (req, res, next) => {
  const admin = req.UserAdmin;

  if (!admin) {
    return res.status(401).json({ error: 'Not is Admin' });
  }

  return next();
};
