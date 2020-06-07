/* eslint-disable comma-dangle */
import { Router } from 'express';
import multer from 'multer';

import PostController from './app/controllers/PostController';
import ProjectController from './app/controllers/ProjectController';
import SessionController from './app/controllers/SessionController';
import SuggestionController from './app/controllers/SuggestionController';
import UserController from './app/controllers/UserController';
import adminMiddleware from './app/middlewares/admin'; // middleware que verifica se o usuário é administrador
import authMiddleware from './app/middlewares/auth'; // middleware que verifica se o usuário esta autenticado
import uuidMiddleware from './app/middlewares/uuid'; // middleware que verifica se o usuário enviou um uuid correto
import multerConfig from './config/multer';
import Mail from './lib/Mail';

const routes = new Router();
const upload = multer(multerConfig);

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

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users/:id', uuidMiddleware, UserController.index);
routes.get('/users', UserController.list);

routes.get('/projects/:id', uuidMiddleware, ProjectController.index);
routes.get('/projects', ProjectController.list);

routes.get('/posts/:id', uuidMiddleware, PostController.index);
routes.get('/posts', PostController.list);

routes.get('/suggestions/:id', uuidMiddleware, SuggestionController.index);
routes.get('/suggestions', SuggestionController.list);

// Apartir daqui todas as rotas precisão que o usurário esteja autenticado
routes.use(authMiddleware);

routes.put('/users', upload.single('image'), UserController.update);
routes.delete('/users/:id', uuidMiddleware, UserController.delete);

routes.post(
  '/projects',
  adminMiddleware,
  upload.single('image'),
  ProjectController.store
);
routes.put(
  '/projects/:id',
  uuidMiddleware,
  adminMiddleware,
  upload.single('image'),
  ProjectController.update
);
routes.delete(
  '/projects/:id',
  uuidMiddleware,
  adminMiddleware,
  ProjectController.delete
);

routes.post(
  '/posts',
  adminMiddleware,
  upload.single('image'),
  PostController.store
);
routes.put(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  upload.single('image'),
  PostController.update
);
routes.delete(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  PostController.delete
);

routes.post('/suggestions', SuggestionController.store);

export default routes;
