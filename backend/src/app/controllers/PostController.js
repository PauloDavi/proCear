import * as Yup from 'yup';

import User from '../models/User';
import Post from '../models/Post';

class PostController {
  async index(req, res) {
    const post = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    if (!post) {
      return res.status(400).json({ error: 'Post does not exist' });
    }

    return res.json(post);
  }
  async list(req, res) {
    const { page = 1 } = req.query;
    const posts = await Post.findAll({
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

    return res.json(posts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description } = req.body;

    const postExist = await Post.findOne({ where: { title } });
    if (postExist) {
      return res.status(400).json({ error: 'Title alredy exist' });
    }

    const post = await Post.create({
      title,
      description,
      creator: req.UserId,
    });

    return res.json(post);
  }

  async update(req, res) {
    return res.json({ admin: req.UserAdmin });
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new PostController();
