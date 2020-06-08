import * as Yup from 'yup';

import deleteFile from '../../utils/deleteFile';
import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async index(req, res) {
    const post = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
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
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
      ],
    });

    return res.json(posts);
  }

  async store(req, res) {
    const image = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      deleteFile(image, 'post');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description } = req.body;

    const postExist = await Post.findOne({ where: { title } });
    if (postExist) {
      deleteFile(image, 'post');
      return res.status(400).json({ error: 'Title already exist' });
    }
    const post = await Post.create({
      image,
      title,
      description,
      creator: req.UserId,
    });

    return res.json(post);
  }

  async update(req, res) {
    const newImage = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      deleteFile(newImage, 'post');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title = '' } = req.body;

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      deleteFile(newImage, 'post');
      return res.status(400).json({ error: 'Post does not exist' });
    }

    if (post.title !== title) {
      const postExist = await Post.findOne({ where: { title } });
      if (postExist) {
        deleteFile(newImage, 'post');
        return res.status(400).json({ error: 'Title already exist' });
      }
    }

    if (newImage) {
      deleteFile(post.image, 'post');
    }

    const newPost = newImage ? { ...req.body, image: newImage } : req.body;

    await post.update(newPost);

    return res.json({ message: 'Updated' });
  }

  async delete(req, res) {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(400).json({ error: 'Post does not exist' });
    }

    const { image } = post;
    deleteFile(image, 'post');

    await post.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

export default new PostController();
