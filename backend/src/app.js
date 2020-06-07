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
      '/uploads',
      express.static(resolve(__dirname, '..', 'uploads')),
    );
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
