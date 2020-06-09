"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _uuid = require('uuid');

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          validate: {
            isEmail: {
              args: true,
              msg: 'Formato email',
            },
            len: {
              args: [5, 64],
              msg: 'Tamanho do email invalido',
            },
          },
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          validate: {
            len: {
              args: [6, 30],
              msg: 'Tamanho da senha invalido',
            },
          },
        },
        phone: {
          type: _sequelize2.default.STRING,
          validate: {
            isNumeric: true,
          },
        },
        password_hash: _sequelize2.default.STRING,
        admin: _sequelize2.default.BOOLEAN,
        authenticated: _sequelize2.default.BOOLEAN,
        token: _sequelize2.default.STRING,
        image: _sequelize2.default.STRING,
        image_url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return this.image ? `${process.env.APP_URL}/uploads/avatars/${this.image}` : 'https://api.adorable.io/avatars/50/abott@adorable.png';
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeCreate', (user) => (user.id = _uuid.v4.call(void 0, )));
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
