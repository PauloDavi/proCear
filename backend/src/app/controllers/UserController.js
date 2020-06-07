/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required().length(11),
      password: Yup.string().min(6).max(30).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    userExists = await User.findOne({ where: { phone: req.body.phone } });
    if (userExists) {
      return res.status(400).json({ error: 'Phone number already exists.' });
    }

    const {
      id, name, email, phone, admin,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string().length(11),
      oldPassword: Yup.string().min(6).max(30),
      password: Yup.string()
        .min(6)
        .max(30)
        .when('oldPassword', (oldPassword, field) =>
          (oldPassword ? field.required() : field),
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        (password ? field.required().oneOf([Yup.ref('password')]) : field),
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, phone, oldPassword } = req.body;

    const user = await User.findByPk(req.UserId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (phone !== user.phone) {
      const phoneExists = await User.findOne({ where: { phone } });

      if (phoneExists) {
        return res.status(400).json({ error: 'Phone number already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
      admin,
    });
  }
}

export default new UserController();
