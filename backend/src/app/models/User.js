/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Tamanho do nome invalido',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
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
          type: Sequelize.VIRTUAL,
          validate: {
            len: {
              args: [6, 30],
              msg: 'Tamanho da senha invalido',
            },
          },
        },
        phone: {
          type: Sequelize.STRING,
          validate: {
            isNumeric: true,
          },
        },
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        image: Sequelize.STRING,
        image_url: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.image ? `${process.env.APP_URL}/uploads/${this.image}` : 'https://api.adorable.io/avatars/50/abott@adorable.png';
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeCreate', (user) => (user.id = v4()));
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
