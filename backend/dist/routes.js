"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable comma-dangle */
var _express = require('express');
var _expressbrute = require('express-brute'); var _expressbrute2 = _interopRequireDefault(_expressbrute);
var _expressbruteredis = require('express-brute-redis'); var _expressbruteredis2 = _interopRequireDefault(_expressbruteredis);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _ConfirmationController = require('./app/controllers/ConfirmationController'); var _ConfirmationController2 = _interopRequireDefault(_ConfirmationController);
var _PassRecoverController = require('./app/controllers/PassRecoverController'); var _PassRecoverController2 = _interopRequireDefault(_PassRecoverController);
var _PostController = require('./app/controllers/PostController'); var _PostController2 = _interopRequireDefault(_PostController);
var _ProjectController = require('./app/controllers/ProjectController'); var _ProjectController2 = _interopRequireDefault(_ProjectController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _SuggestionController = require('./app/controllers/SuggestionController'); var _SuggestionController2 = _interopRequireDefault(_SuggestionController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _VoteController = require('./app/controllers/VoteController'); var _VoteController2 = _interopRequireDefault(_VoteController);
var _admin = require('./app/middlewares/admin'); var _admin2 = _interopRequireDefault(_admin); // middleware que verifica se o usuário é administrador
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth); // middleware que verifica se o usuário esta autenticado
var _uuid = require('./app/middlewares/uuid'); var _uuid2 = _interopRequireDefault(_uuid); // middleware que verifica se o usuário enviou um uuid correto
var _multerAvatars = require('./config/multerAvatars'); var _multerAvatars2 = _interopRequireDefault(_multerAvatars);
var _multerPosts = require('./config/multerPosts'); var _multerPosts2 = _interopRequireDefault(_multerPosts);
var _multerProjects = require('./config/multerProjects'); var _multerProjects2 = _interopRequireDefault(_multerProjects);

const routes = new (0, _express.Router)();

const bruteStore = new (0, _expressbruteredis2.default)({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new (0, _expressbrute2.default)(bruteStore);

// Configuração de armazenamento de arquivos
const uploadAvatars = _multer2.default.call(void 0, _multerAvatars2.default);
const uploadPosts = _multer2.default.call(void 0, _multerPosts2.default);
const uploadProjects = _multer2.default.call(void 0, _multerProjects2.default);

routes.get('/confirmation', _ConfirmationController2.default.index);
routes.post('/confirmation', _ConfirmationController2.default.store);

routes.post('/sessions', bruteForce.prevent, _SessionController2.default.store);

routes.get('/passrecover', _PassRecoverController2.default.index);
routes.post('/passrecover', _PassRecoverController2.default.store);

routes.post('/users', _UserController2.default.store);
routes.get('/users/:id', _uuid2.default, _UserController2.default.index);
routes.get('/users', _UserController2.default.list);

routes.get('/votes/count', _VoteController2.default.count);
routes.get('/votes', _VoteController2.default.list);

routes.get('/projects/:id', _uuid2.default, _ProjectController2.default.index);
routes.get('/projects', _ProjectController2.default.list);

routes.get('/posts/:id', _uuid2.default, _PostController2.default.index);
routes.get('/posts', _PostController2.default.list);

routes.get('/suggestions', _SuggestionController2.default.list);

// Apartir daqui todas as rotas precisão que o usurário esteja autenticado
routes.use(_auth2.default);

routes.put('/users', uploadAvatars.single('image'), _UserController2.default.update);
routes.delete('/users', _UserController2.default.delete);

routes.post(
  '/projects',
  _admin2.default,
  uploadProjects.single('image'),
  _ProjectController2.default.store
);
routes.put(
  '/projects/:id',
  _uuid2.default,
  _admin2.default,
  uploadProjects.single('image'),
  _ProjectController2.default.update
);
routes.delete(
  '/projects/:id',
  _uuid2.default,
  _admin2.default,
  _ProjectController2.default.delete
);

routes.post(
  '/posts',
  _admin2.default,
  uploadPosts.single('image'),
  _PostController2.default.store
);
routes.put(
  '/posts/:id',
  _uuid2.default,
  _admin2.default,
  uploadPosts.single('image'),
  _PostController2.default.update
);
routes.delete(
  '/posts/:id',
  _uuid2.default,
  _admin2.default,
  _PostController2.default.delete
);

routes.post('/votes/:project_id', _VoteController2.default.store);
routes.delete('/votes/:id', _uuid2.default, _VoteController2.default.delete);

routes.post('/suggestions', _SuggestionController2.default.store);

exports. default = routes;
