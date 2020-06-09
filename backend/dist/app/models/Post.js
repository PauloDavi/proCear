"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _uuid = require('uuid');

class Post extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: _sequelize2.default.STRING,
          validate: {
            len: {
              args: [3, 100],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        description: {
          type: _sequelize2.default.STRING(500),
          validate: {
            len: {
              args: [5, 500],
              msg: 'Tamanho do email invalido',
            },
          },
        },
        image: _sequelize2.default.STRING,
        image_url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return this.image ? `${process.env.APP_URL}/uploads/posts/${this.image}` : null;
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeCreate', (user) => (user.id = _uuid.v4.call(void 0, )));

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator' });
  }
}

exports. default = Post;
