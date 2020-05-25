import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class Posts extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 100],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        descricao: {
          type: Sequelize.STRING(500),
          validate: {
            len: {
              args: [5, 500],
              msg: 'Tamanho do email invalido',
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', (user) => (user.id = v4()));

    return this;
  }
}

export default Posts;
