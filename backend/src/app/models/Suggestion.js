import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class Suggestion extends Model {
  static init(sequelize) {
    // Campos no banco que tenho acesso direto
    super.init(
      {
        description: {
          type: Sequelize.STRING(500),
          validate: {
            len: {
              args: [5, 500],
              msg: 'Tamanho da descrição invalido',
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    // Função que seta o id como um UUID.v4
    this.addHook('beforeCreate', (user) => (user.id = v4()));

    return this;
  }

  // Associação com outras tabelas
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator' });
  }
}

export default Suggestion;
