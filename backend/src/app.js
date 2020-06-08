/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import 'dotenv/config';

import * as Sentry from '@sentry/node';
import cors from 'cors';
import express from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { resolve } from 'path';
import RateLimitRedis from 'rate-limit-redis';
import redis from 'redis';
import Youch from 'youch';

import 'express-async-errors';

import sentryConfig from './config/sentry';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: process.env.WEB_URL,
      })
    );
    this.server.use(express.json());
    this.server.use(
      '/assets',
      express.static(resolve(__dirname, '..', 'uploads', 'assets'))
    );
    this.server.use(
      '/uploads/avatars',
      express.static(resolve(__dirname, '..', 'uploads', 'avatars'))
    );
    this.server.use(
      '/uploads/posts',
      express.static(resolve(__dirname, '..', 'uploads', 'posts'))
    );
    this.server.use(
      '/uploads/projects',
      express.static(resolve(__dirname, '..', 'uploads', 'projects'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            cliente: redis.createClient({
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
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}
export default new App().server;
