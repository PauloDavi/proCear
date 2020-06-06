import Sequelize from 'sequelize';

import User from '../app/models/User';
import Project from '../app/models/Project';
import Post from '../app/models/Post';
import Suggestion from '../app/models/Suggestion';

import databaseConfig from '../config/database';

const models = [User, Project, Post, Suggestion];

class Database {
  constructor() {
    this.init();
  }
  init() {
    // Inicia conecxao com banco de dados
    this.connection = new Sequelize(databaseConfig);

    // Conecta todos os modelos do array models com o banco e faz as associações caso existao
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
