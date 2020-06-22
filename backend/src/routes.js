/* eslint-disable comma-dangle */
import { Router } from 'express';
// import Brute from 'express-brute';
// import BruteRedis from 'express-brute-redis';
import multer from 'multer';

import ConfirmationController from './app/controllers/ConfirmationController';
import PassRecoverController from './app/controllers/PassRecoverController';
import PostController from './app/controllers/PostController';
import ProjectController from './app/controllers/ProjectController';
import SessionController from './app/controllers/SessionController';
import SuggestionController from './app/controllers/SuggestionController';
import UserController from './app/controllers/UserController';
import VoteController from './app/controllers/VoteController';
import adminMiddleware from './app/middlewares/admin'; // middleware que verifica se o usuário é administrador
import authMiddleware from './app/middlewares/auth'; // middleware que verifica se o usuário esta autenticado
import uuidMiddleware from './app/middlewares/uuid'; // middleware que verifica se o usuário enviou um uuid correto
import multerAvatars from './config/multerAvatars';
import multerPosts from './config/multerPosts';
import multerProjects from './config/multerProjects';

const routes = new Router();

// const bruteStore = new BruteRedis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
// });

// const bruteForce = new Brute(bruteStore);

// Configuração de armazenamento de arquivos
const uploadAvatars = multer(multerAvatars);
const uploadPosts = multer(multerPosts);
const uploadProjects = multer(multerProjects);

routes.put('/confirmation', ConfirmationController.index);
routes.post('/confirmation', ConfirmationController.store);

// routes.post('/sessions', bruteForce.prevent, SessionController.store);
routes.post('/sessions', SessionController.store);

routes.get('/passrecover', PassRecoverController.index);
routes.post('/passrecover', PassRecoverController.store);

routes.post('/users', UserController.store);
routes.get('/users/:id', uuidMiddleware, UserController.index);
routes.get('/users', UserController.list);

routes.get('/votes/count', VoteController.count);
routes.get('/votes', VoteController.list);

routes.get('/projects/:id', uuidMiddleware, ProjectController.index);
routes.get('/projects', ProjectController.list);

routes.get('/posts/:id', uuidMiddleware, PostController.index);
routes.get('/posts', PostController.list);

routes.get('/suggestions', SuggestionController.list);
routes.post('/suggestions', SuggestionController.store);

// Apartir daqui todas as rotas precisão que o usurário esteja autenticado
routes.use(authMiddleware);

routes.put('/users', uploadAvatars.single('image'), UserController.update);
routes.delete('/users', UserController.delete);

routes.post(
  '/projects',
  adminMiddleware,
  uploadProjects.single('image'),
  ProjectController.store
);
routes.put(
  '/projects/:id',
  uuidMiddleware,
  adminMiddleware,
  uploadProjects.single('image'),
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
  uploadPosts.single('image'),
  PostController.store
);
routes.put(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  uploadPosts.single('image'),
  PostController.update
);
routes.delete(
  '/posts/:id',
  uuidMiddleware,
  adminMiddleware,
  PostController.delete
);

routes.post('/votes/:project_id', VoteController.store);
routes.delete('/votes/:id', uuidMiddleware, VoteController.delete);

export default routes;
