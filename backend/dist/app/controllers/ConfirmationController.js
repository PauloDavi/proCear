"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);
var _createToken = require('../../utils/createToken'); var _createToken2 = _interopRequireDefault(_createToken);
var _ConfirmationMail = require('../jobs/ConfirmationMail'); var _ConfirmationMail2 = _interopRequireDefault(_ConfirmationMail);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

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
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret);

      if (!decoded) {
        return res.status(400).json({ error: 'Token invalid' });
      }

      const { hash } = decoded;

      const user = await _User2.default.findOne({ where: { token: hash } });

      if (!user) {
        return res.status(400).json({ error: 'token invalid' });
      }

      await user.update({ authenticated: true, token: null });

      return res.json({ message: 'Your email is check' });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async store(req, res) {
    const { email } = req.body;

    const user = await _User2.default.findOne({
      where: { email },
      attributes: ['name', 'token', 'authenticated'],
    });

    if (!user) {
      return res.status(400).json({ message: 'Email not exist' });
    }

    if (user.authenticated) {
      return res.status(400).json({ error: 'User already authenticated' });
    }

    const link = await _createToken2.default.call(void 0, email, process.env.WEB_CONFIRMATION_EMAIL);

    if (link === 'user not exist') {
      return res.status(400).json({ error: 'Email not registered' });
    }

    await _Queue2.default.add(_ConfirmationMail2.default.key, {
      name: user.name,
      email,
      link,
    });

    return res.json({ message: 'Confirmation email send for you' });
  }
}

exports. default = new ConfirmationController();
