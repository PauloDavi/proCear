"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _uuid = require('uuid');

class Suggestion extends _sequelize.Model {
  static init(sequelize) {
    // Campos no banco que tenho acesso direto
    super.init(
      {
        description: {
          type: _sequelize2.default.STRING(500),
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
      },
    );

    // Função que seta o id como um UUID.v4
    this.addHook('beforeCreate', (user) => (user.id = _uuid.v4.call(void 0, )));

    return this;
  }

  // Associação com outras tabelas
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator' });
  }
}

exports. default = Suggestion;
