import validator from 'validator';

export default async (req, res, next) => {
  const { id } = req.params;

  if (!validator.isUUID(id)) {
    return res.status(401).json({ error: 'Id invalid' });
  }

  return next();
};
