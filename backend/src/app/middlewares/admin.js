// Middleware que verifica se o usuário é um administrador

export default async (req, res, next) => {
  const admin = req.UserAdmin;

  if (!admin) {
    return res.status(401).json({ error: 'Not is Admin' });
  }

  return next();
};
