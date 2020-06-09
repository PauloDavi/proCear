"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _crypto = require('crypto');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../config/auth'); var _auth2 = _interopRequireDefault(_auth);

 async function createToken(email, route) {
  const user = await _User2.default.findOne({ where: { email } });

  if (!user) {
    return 'user not exist';
  }

  const hash = _crypto.randomBytes.call(void 0, 16).toString('hex');

  const token = _jsonwebtoken2.default.sign({ hash }, _auth2.default.secret, { expiresIn: '2h' });

  await user.update({ token: hash });

  return `${process.env.WEB_URL}/${route}/${token}`;
} exports.default = createToken;
