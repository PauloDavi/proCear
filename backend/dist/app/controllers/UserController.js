"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);
var _createToken = require('../../utils/createToken'); var _createToken2 = _interopRequireDefault(_createToken);
var _deleteFile = require('../../utils/deleteFile'); var _deleteFile2 = _interopRequireDefault(_deleteFile);
var _ConfirmationMail = require('../jobs/ConfirmationMail'); var _ConfirmationMail2 = _interopRequireDefault(_ConfirmationMail);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    const user = await _User2.default.findByPk(req.params.id, {
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
    const user = await _User2.default.findAll({
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

    let userExists = await _User2.default.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    userExists = await _User2.default.findOne({ where: { phone: req.body.phone } });
    if (userExists) {
      return res.status(400).json({ error: 'Phone number already exists.' });
    }

    const {
      id, name, email, phone, admin,
    } = await _User2.default.create(req.body);

    const link = await _createToken2.default.call(void 0, email, process.env.WEB_CONFIRMATION_EMAIL);

    await _Queue2.default.add(_ConfirmationMail2.default.key, {
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
      _deleteFile2.default.call(void 0, newImage, 'avatars');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, phone, oldPassword } = req.body;

    const user = await _User2.default.findByPk(req.UserId);

    if (email !== undefined && email !== user.email) {
      const emailExists = await _User2.default.findOne({ where: { email } });

      if (emailExists) {
        _deleteFile2.default.call(void 0, newImage, 'avatars');
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (phone !== undefined && phone !== user.phone) {
      const phoneExists = await _User2.default.findOne({ where: { phone } });

      if (phoneExists) {
        _deleteFile2.default.call(void 0, newImage, 'avatars');
        return res.status(400).json({ error: 'Phone number already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      _deleteFile2.default.call(void 0, newImage, 'avatars');
      return res.status(401).json({ error: 'Password does not match.' });
    }

    if (newImage) {
      _deleteFile2.default.call(void 0, user.image, 'avatars');
    }

    const newProject = newImage ? { ...req.body, image: newImage } : req.body;

    await user.update(newProject);

    return res.json({ message: 'Updated' });
  }

  async delete(req, res) {
    const user = await _User2.default.findByPk(req.UserId);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const { image } = user;
    _deleteFile2.default.call(void 0, image, 'avatars');

    await user.destroy();

    return res.json();
  }
}

exports. default = new UserController();
