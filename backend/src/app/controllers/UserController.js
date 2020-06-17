/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import createToken from '../../utils/createToken';
import deleteFile from '../../utils/deleteFile';
import ConfirmationMail from '../jobs/ConfirmationMail';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'admin',
        'image',
        'image_url',
      ],
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    return res.json(user);
  }

  async list(req, res) {
    const { page = 1 } = req.query;
    const user = await User.findAll({
      order: ['created_at'],
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'admin',
        'image',
        'image_url',
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(user);
  }

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

    const link = await createToken(email, process.env.WEB_CONFIRMATION_EMAIL);

    await Queue.add(ConfirmationMail.key, {
      name,
      email,
      link,
    });

    return res.json({
      id,
      name,
      email,
      phone,
      admin,
    });
  }

  async update(req, res) {
    const newImage = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      name: Yup.string(),
      phone: Yup.string().length(11),
      oldPassword: Yup.string(),
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
      deleteFile(newImage, 'avatars');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { phone, oldPassword } = req.body;

    const user = await User.findByPk(req.UserId);

    if (phone !== undefined && phone !== user.phone) {
      const phoneExists = await User.findOne({ where: { phone } });

      if (phoneExists) {
        deleteFile(newImage, 'avatars');
        return res.status(400).json({ error: 'Phone number already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      deleteFile(newImage, 'avatars');
      return res.status(401).json({ error: 'Password does not match.' });
    }

    if (newImage) {
      deleteFile(user.image, 'avatars');
    }

    const newProject = newImage ? { ...req.body, image: newImage } : req.body;
    await user.update(newProject);

    const newUser = await User.findByPk(req.UserId, {
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'admin',
        'image',
        'image_url',
      ],
    });

    return res.json(newUser);
  }

  async delete(req,
    res) {
    const user = await User.findByPk(req.UserId);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const { image } = user;
    deleteFile(image, 'avatars');

    await user.destroy();

    return res.json();
  }
}

export default new UserController();
