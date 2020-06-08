import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import NotificationMail from '../jobs/NotificationMail';
import Suggestion from '../models/Suggestion';
import User from '../models/User';

class SuggestionController {
  async list(req, res) {
    const { page = 1 } = req.query;
    const posts = await Suggestion.findAll({
      order: ['created_at'],
      attributes: ['id', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
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

    const suggestion = await Suggestion.create({
      description,
      creator: req.UserId,
    });

    const student = await User.findByPk(req.UserId, {
      attributes: ['name'],
    });

    Queue.add(NotificationMail.key, {
      nome: student.name,
      description,
    });

    return res.json(suggestion);
  }
}

export default new SuggestionController();
