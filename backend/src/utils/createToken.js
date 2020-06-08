import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import User from '../app/models/User';
import authConfig from '../config/auth';

export default async function createToken(email, route) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return 'user not exist';
  }

  const hash = randomBytes(16).toString('hex');

  const token = jwt.sign({ hash }, authConfig.secret, { expiresIn: '2h' });

  await user.update({ token: hash });

  return `${process.env.WEB_URL}/${route}/${token}`;
}
