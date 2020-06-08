import * as Yup from 'yup';

import Mail from '../../lib/Mail';
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

    Mail.sendMail({
      to: 'Davi <paulo.araujo@cear.ufpb.br>',
      subject: 'Notificação de sugestão',
      template: 'notification',
      context: {
        student: student.name,
        suggests: description,
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        solicitation_type: 'notificação de sugestão',
      },
    });

    return res.json(suggestion);
  }
}

export default new SuggestionController();
