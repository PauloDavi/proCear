"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _deleteFile = require('../../utils/deleteFile'); var _deleteFile2 = _interopRequireDefault(_deleteFile);
var _Post = require('../models/Post'); var _Post2 = _interopRequireDefault(_Post);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class PostController {
  async index(req, res) {
    const post = await _Post2.default.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description'],
      include: [
        {
          model: _User2.default,
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
    const posts = await _Post2.default.findAll({
      order: ['created_at'],
      attributes: ['id', 'title', 'description'],
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
    const image = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      _deleteFile2.default.call(void 0, image, 'post');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description } = req.body;

    const postExist = await _Post2.default.findOne({ where: { title } });
    if (postExist) {
      _deleteFile2.default.call(void 0, image, 'post');
      return res.status(400).json({ error: 'Title already exist' });
    }
    const post = await _Post2.default.create({
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
      _deleteFile2.default.call(void 0, newImage, 'post');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title = '' } = req.body;

    const post = await _Post2.default.findByPk(req.params.id);

    if (!post) {
      _deleteFile2.default.call(void 0, newImage, 'post');
      return res.status(400).json({ error: 'Post does not exist' });
    }

    if (post.title !== title) {
      const postExist = await _Post2.default.findOne({ where: { title } });
      if (postExist) {
        _deleteFile2.default.call(void 0, newImage, 'post');
        return res.status(400).json({ error: 'Title already exist' });
      }
    }

    if (newImage) {
      _deleteFile2.default.call(void 0, post.image, 'post');
    }

    const newPost = newImage ? { ...req.body, image: newImage } : req.body;

    await post.update(newPost);

    return res.json({ message: 'Updated' });
  }

  async delete(req, res) {
    const post = await _Post2.default.findByPk(req.params.id);

    if (!post) {
      return res.status(400).json({ error: 'Post does not exist' });
    }

    const { image } = post;
    _deleteFile2.default.call(void 0, image, 'post');

    await post.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

exports. default = new PostController();
