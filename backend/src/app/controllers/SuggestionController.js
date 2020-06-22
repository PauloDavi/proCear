import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
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
    const authHeader = req.headers.authorization;
    let userId = null;

    if (authHeader) {
      const [, token] = authHeader.split(' ');

      try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        // Ao autenticar o usuário seta o parâmetro do id
        userId = decoded.id;
      } catch (err) {
        userId = null;
      }
    }

    const schema = Yup.object().shape({
      subject: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description, subject } = req.body;

    const suggestion = await Suggestion.create({
      description,
      subject,
      creator: userId,
    });

    if (userId) {
      const user = await User.findByPk(userId, {
        attributes: ['name'],
      });

      Queue.add(NotificationMail.key, {
        name: user.name,
        description,
      });

      return res.json(suggestion);
    }

    Queue.add(NotificationMail.key, {
      description,
    });

    return res.json(suggestion);
  }
}

export default new SuggestionController();
