import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class Projects extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 100],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 500],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        date_finish: Sequelize.DATE,
        votes: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', (user) => (user.id = v4()));

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator' });
  }
}

export default Projects;
