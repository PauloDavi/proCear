/* eslint-disable prettier/prettier */
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { resolve } from 'path';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/assets',
      express.static(resolve(__dirname, '..', 'uploads', 'assets')),
    );
    this.server.use(
      '/uploads/avatars',
      express.static(resolve(__dirname, '..', 'uploads', 'avatars')),
    );
    this.server.use(
      '/uploads/posts',
      express.static(resolve(__dirname, '..', 'uploads', 'posts')),
    );
    this.server.use(
      '/uploads/projects',
      express.static(resolve(__dirname, '..', 'uploads', 'projects')),
    );
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
