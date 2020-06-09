"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _deleteFile = require('../../utils/deleteFile'); var _deleteFile2 = _interopRequireDefault(_deleteFile);
var _Project = require('../models/Project'); var _Project2 = _interopRequireDefault(_Project);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class ProjectController {
  async index(req, res) {
    const project = await _Project2.default.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'description',
        'date_finish',
        'votes',
        'image',
        'image_url',
      ],
      include: [
        {
          model: _User2.default,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
      ],
    });

    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    return res.json(project);
  }

  async list(req, res) {
    const { page = 1 } = req.query;
    const projects = await _Project2.default.findAll({
      order: ['created_at'],
      attributes: [
        'id',
        'title',
        'description',
        'date_finish',
        'votes',
        'image',
        'image_url',
      ],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: _User2.default,
          attributes: ['id', 'name', 'email', 'phone', 'image', 'image_url'],
        },
      ],
    });

    return res.json(projects);
  }

  async store(req, res) {
    const image = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date_finish: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      _deleteFile2.default.call(void 0, image, 'projects');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, date_finish } = req.body;

    const projectExist = await _Project2.default.findOne({ where: { title } });
    if (projectExist) {
      _deleteFile2.default.call(void 0, image, 'projects');
      return res.status(400).json({ error: 'Title already exist' });
    }
    const project = await _Project2.default.create({
      image,
      title,
      description,
      date_finish,
      creator: req.UserId,
    });

    return res.json(project);
  }

  async update(req, res) {
    const newImage = req.file ? req.file.filename : null;
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date_finish: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      _deleteFile2.default.call(void 0, newImage, 'projects');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title = '' } = req.body;

    const project = await _Project2.default.findByPk(req.params.id);

    if (!project) {
      _deleteFile2.default.call(void 0, newImage, 'projects');
      return res.status(400).json({ error: 'Project does not exist' });
    }

    if (project.title !== title) {
      const projectExist = await _Project2.default.findOne({ where: { title } });
      if (projectExist) {
        _deleteFile2.default.call(void 0, newImage, 'projects');
        return res.status(400).json({ error: 'Title already exist' });
      }
    }

    if (newImage) {
      _deleteFile2.default.call(void 0, project.image, 'projects');
    }

    const newProject = newImage ? { ...req.body, image: newImage } : req.body;

    await project.update(newProject);

    return res.json({ message: 'Updated' });
  }

  async delete(req, res) {
    const project = await _Project2.default.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    const { image } = project;
    _deleteFile2.default.call(void 0, image, 'projects');

    await project.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

exports. default = new ProjectController();
