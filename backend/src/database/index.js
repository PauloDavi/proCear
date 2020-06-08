/* eslint-disable comma-dangle */
import Sequelize from 'sequelize';

import Post from '../app/models/Post';
import Project from '../app/models/Project';
import Suggestion from '../app/models/Suggestion';
import User from '../app/models/User';
import Vote from '../app/models/Vote';
import databaseConfig from '../config/database';

const models = [User, Project, Post, Suggestion, Vote];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicia conexão com banco de dados
    this.connection = new Sequelize(databaseConfig);

    // Conecta todos os modelos do array models com o banco e faz as associações caso existam
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
