"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
require('dotenv/config');

var _node = require('@sentry/node'); var Sentry = _interopRequireWildcard(_node);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path');
var _ratelimitredis = require('rate-limit-redis'); var _ratelimitredis2 = _interopRequireDefault(_ratelimitredis);
var _redis = require('redis'); var _redis2 = _interopRequireDefault(_redis);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);

require('express-async-errors');

var _sentry = require('./config/sentry'); var _sentry2 = _interopRequireDefault(_sentry);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    Sentry.init(_sentry2.default);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(_helmet2.default.call(void 0, ));
    this.server.use(
      _cors2.default.call(void 0, {
        origin: process.env.WEB_URL,
      })
    );
    this.server.use(_express2.default.json());
    this.server.use(
      '/assets',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'assets'))
    );
    this.server.use(
      '/uploads/avatars',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'avatars'))
    );
    this.server.use(
      '/uploads/posts',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'posts'))
    );
    this.server.use(
      '/uploads/projects',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'projects'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new (0, _expressratelimit2.default)({
          store: new (0, _ratelimitredis2.default)({
            cliente: _redis2.default.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
    }
  }

  routes() {
    this.server.use(_routes2.default);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new (0, _youch2.default)(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}
exports. default = new App().server;
