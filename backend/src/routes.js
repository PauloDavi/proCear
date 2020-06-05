import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import PostController from './app/controllers/PostController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';
import uuidMiddleware from './app/middlewares/uuid';

import Mail from './lib/Mail';

const routes = new Router();

routes.get('/test', async (req, res) => {
  await Mail.sendMail({
    to: 'Davi <paulo.araujo@cear.ufpb.br>',
    subject: 'test',
    template: 'cancellation',
    context: {
      provider: 'fulano',
      user: 'sicrano',
      date: 'hoje',
    },
  });
  return res.json({ Ok: true });
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/projects/:id', uuidMiddleware, ProjectController.index);
routes.get('/projects', ProjectController.list);

routes.get('/posts/:id', uuidMiddleware, PostController.index);
routes.get('/posts', PostController.list);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/projects', adminMiddleware, ProjectController.store);
routes.put(
  '/projects/:id',
  uuidMiddleware,
  adminMiddleware,
  ProjectController.update
);
routes.delete(
  '/projects/:id',
  uuidMiddleware,
  adminMiddleware,
  ProjectController.delete
);

routes.post('/posts', adminMiddleware, PostController.store);
routes.put(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  PostController.update
);
routes.delete(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  PostController.delete
);

export default routes;
