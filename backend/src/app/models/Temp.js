/* eslint-disable prettier/prettier */
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        hash: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default User;
