import * as Yup from 'yup';

import Suggestion from '../models/Suggestion';
import User from '../models/User';

class SuggestionController {
  async index(req, res) {
    const suggestion = await Suggestion.findByPk(req.params.id, {
      attributes: ['id', 'description'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
      ],
    });

    if (!suggestion) {
      return res.status(400).json({ error: 'Suggestion does not exist' });
    }

    return res.json(suggestion);
  }

  async list(req, res) {
    const { page = 1, user } = req.query;
    if (!user) {
      const suggestions = await Suggestion.findAll({
        order: ['created_at'],
        attributes: ['id', 'title', 'description'],
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
          },
        ],
      });

      return res.json(suggestions);
    }

    const filterSuggestions = await Suggestion.findAll({
      where: { creator: user },
      order: ['created_at'],
      attributes: ['id', 'title', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    return res.json(filterSuggestions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    try {
      const suggestion = await Suggestion.create({
        description,
        creator: req.UserId,
      });

      return res.json(suggestion);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new SuggestionController();
