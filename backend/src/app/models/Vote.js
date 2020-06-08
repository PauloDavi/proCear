/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import { Model } from 'sequelize';
import { v4 } from 'uuid';

class Vote extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    );

    this.addHook('beforeCreate', (user) => (user.id = v4()));

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Project, { foreignKey: 'project_id' });
  }
}

export default Vote;
