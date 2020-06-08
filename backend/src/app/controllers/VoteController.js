/* eslint-disable prettier/prettier */
import validator from 'validator';
// import * as Yup from 'yup';

import Project from '../models/Project';
import User from '../models/User';
import Vote from '../models/Vote';

class VoteController {
  async count(req, res) {
    const { project_id, user_id } = req.body;

    if (!validator.isUUID(project_id) || !validator.isUUID(user_id)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const count = await Vote.count({ where: { project_id, user_id } });
    if (count) {
      return res.json({ count });
    }
    return res.status(400).json({ error: 'bad request' });
  }

  async store(req, res) {
    const { project_id } = req.params;
    const user_id = req.UserId;

    if (!validator.isUUID(project_id)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const voteExist = await Vote.findOne({ where: { project_id, user_id } });

    if (voteExist) {
      return res.status(401).json({ error: 'Vote already exist' });
    }

    const vote = await Vote.create({
      project_id,
      user_id,
    });

    return res.json(vote);
  }

  async list(req, res) {
    const { page = 1 } = req.query;
    const projects = await Vote.findAll({
      order: ['created_at'],
      attributes: [
        'id',
      ],
      limit: 30,
      offset: (page - 1) * 30,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
        {
          model: Project,
          attributes: ['id', 'title', 'description', 'date_finish', 'image', 'image_url'],
        },
      ],
    });


    return res.json(projects);
  }

  async delete(req, res) {
    const vote = await Vote.findByPk(req.params.id);

    if (!vote) {
      return res.status(400).json({ error: 'Vote does not exist' });
    }

    await vote.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

export default new VoteController();
