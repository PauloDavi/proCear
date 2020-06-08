/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';
import createToken from '../../utils/createToken';
import User from '../models/User';

class PassRecoverController {
  async index(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string().required(),
      password: Yup.string().min(6).max(30),
      confirmPassword: Yup.string().when('password', (password, field) =>
        (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { token, password } = req.body;

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

      await user.update({ token: null, password });

      return res.json({ message: 'Your password is updated' });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email }, attributes: ['name', 'authenticated'] });

    if (!user) {
      return res.status(400).json({ message: 'Email not exist' });
    }

    if (!user.authenticated) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    const link = await createToken(email, process.env.WEB_RECOVER_PASS);

    if (link === 'user not exist') {
      return res.status(400).json({ error: 'Email not registered' });
    }

    Mail.sendMail({
      to: `${user.name} <${email}>`,
      subject: 'ProCear - Recuperação de senha',
      template: 'recoverPassword',
      context: {
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        link,
        solicitation_type: 'confirmação de cadastro',
      },
    });

    return res.json({ message: 'Recover email send for you' });
  }
}

export default new PassRecoverController();
