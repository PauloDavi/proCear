"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);
// import * as Yup from 'yup';

var _Project = require('../models/Project'); var _Project2 = _interopRequireDefault(_Project);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Vote = require('../models/Vote'); var _Vote2 = _interopRequireDefault(_Vote);

class VoteController {
  async count(req, res) {
    const { project_id, user_id } = req.body;

    if (!_validator2.default.isUUID(project_id) || !_validator2.default.isUUID(user_id)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const count = await _Vote2.default.count({ where: { project_id, user_id } });
    if (count) {
      return res.json({ count });
    }
    return res.status(400).json({ error: 'bad request' });
  }

  async store(req, res) {
    const { project_id } = req.params;
    const user_id = req.UserId;

    if (!_validator2.default.isUUID(project_id)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const voteExist = await _Vote2.default.findOne({ where: { project_id, user_id } });

    if (voteExist) {
      return res.status(401).json({ error: 'Vote already exist' });
    }

    const vote = await _Vote2.default.create({
      project_id,
      user_id,
    });

    return res.json(vote);
  }

  async list(req, res) {
    const { page = 1 } = req.query;
    const projects = await _Vote2.default.findAll({
      order: ['created_at'],
      attributes: [
        'id',
      ],
      limit: 30,
      offset: (page - 1) * 30,
      include: [
        {
          model: _User2.default,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
        {
          model: _Project2.default,
          attributes: ['id', 'title', 'description', 'date_finish', 'image', 'image_url'],
        },
      ],
    });


    return res.json(projects);
  }

  async delete(req, res) {
    const vote = await _Vote2.default.findByPk(req.params.id);

    if (!vote) {
      return res.status(400).json({ error: 'Vote does not exist' });
    }

    await vote.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

exports. default = new VoteController();
