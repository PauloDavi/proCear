import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class Projetos extends Model {
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
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 500],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        data_finalizacao: Sequelize.DATE,
        votos: Sequelize.INTERGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', (user) => (user.id = v4()));

    return this;
  }
}

export default Projetos;
