"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);
var _NotificationMail = require('../jobs/NotificationMail'); var _NotificationMail2 = _interopRequireDefault(_NotificationMail);
var _Suggestion = require('../models/Suggestion'); var _Suggestion2 = _interopRequireDefault(_Suggestion);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SuggestionController {
  async list(req, res) {
    const { page = 1 } = req.query;
    const posts = await _Suggestion2.default.findAll({
      order: ['created_at'],
      attributes: ['id', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: _User2.default,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
      ],
    });

    return res.json(posts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    const suggestion = await _Suggestion2.default.create({
      description,
      creator: req.UserId,
    });

    const student = await _User2.default.findByPk(req.UserId, {
      attributes: ['name'],
    });

    _Queue2.default.add(_NotificationMail2.default.key, {
      nome: student.name,
      description,
    });

    return res.json(suggestion);
  }
}

exports. default = new SuggestionController();
