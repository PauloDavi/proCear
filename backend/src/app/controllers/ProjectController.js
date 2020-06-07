/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
import * as Yup from 'yup';

import deleteFile from '../../utils/deleteFile';
import Project from '../models/Project';
import User from '../models/User';

class ProjectController {
  async index(req, res) {
    const project = await Project.findByPk(req.params.id, {
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
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
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
    const projects = await Project.findAll({
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
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
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
      deleteFile(image);
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, date_finish } = req.body;

    const projectExist = await Project.findOne({ where: { title } });
    if (projectExist) {
      deleteFile(image);
      return res.status(400).json({ error: 'Title already exist' });
    }
    const project = await Project.create({
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
      deleteFile(newImage);
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title = '' } = req.body;

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      deleteFile(newImage);
      return res.status(400).json({ error: 'Project does not exist' });
    }

    if (project.title !== title) {
      const projectExist = await Project.findOne({ where: { title } });
      if (projectExist) {
        deleteFile(newImage);
        return res.status(400).json({ error: 'Title already exist' });
      }
    }

    if (newImage) {
      deleteFile(project.image);
    }

    const { title: newTitle, description, date_finish } = req.body;

    let newProject = {};

    newImage
      ? (newProject = {
        title: newTitle,
        description,
        date_finish,
        image: newImage,
      })
      : (newProject = {
        title: newTitle,
        description,
        date_finish,
      });

    const projectUpdate = await project.update(newProject);

    return res.json(projectUpdate);
  }

  async delete(req, res) {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    const { image } = project;
    deleteFile(image);

    await project.destroy();

    return res.json({ message: 'Delete with success' });
  }
}

export default new ProjectController();
