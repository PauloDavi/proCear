import * as Yup from 'yup';

import User from '../models/User';
import Project from '../models/Project';

class ProjectController {
  async index(req, res) {
    const project = await Project.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description', 'date_finish', 'votes'],
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
      attributes: ['id', 'title', 'description', 'date_finish', 'votes'],
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
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date_finish: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, date_finish } = req.body;

    const projectExist = await Project.findOne({ where: { title } });
    if (projectExist) {
      return res.status(400).json({ error: 'Title alredy exist' });
    }

    const project = await Project.create({
      title,
      description,
      date_finish,
      creator: req.UserId,
    });

    return res.json(project);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date_finish: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title = '' } = req.body;

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    if (project.title !== title) {
      const projectExist = await Project.findOne({ where: { title } });
      if (projectExist) {
        return res.status(400).json({ error: 'Title alredy exist' });
      }
    }

    const projectUpdate = await project.update(req.body);

    return res.json(projectUpdate);
  }

  async delete(req, res) {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    await project.destroy();

    return res.json({ mensage: 'Delete with success' });
  }
}

export default new ProjectController();
