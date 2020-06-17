/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import createToken from '../../utils/createToken';
import ConfirmationMail from '../jobs/ConfirmationMail';
import User from '../models/User';

class ConfirmationController {
  async index(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { token } = req.body;

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      if (!decoded) {
        return res.status(400).json({ error: 'Token invalid' });
      }

      const { hash } = decoded;

      const user = await User.findOne({ where: { token: hash } });

      if (!user) {
        return res.status(400).json({ error: 'token invalid' });
      }

      await user.update({ authenticated: true, token: null });

      return res.json({ message: 'Your email is check' });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['name', 'token', 'authenticated'],
    });

    if (!user) {
      return res.status(400).json({ message: 'Email not exist' });
    }

    if (user.authenticated) {
      return res.status(400).json({ error: 'User already authenticated' });
    }

    const link = await createToken(email, process.env.WEB_CONFIRMATION_EMAIL);

    if (link === 'user not exist') {
      return res.status(400).json({ error: 'Email not registered' });
    }

    await Queue.add(ConfirmationMail.key, {
      name: user.name,
      email,
      link,
    });

    return res.json({ message: 'Confirmation email send for you' });
  }
}

export default new ConfirmationController();
