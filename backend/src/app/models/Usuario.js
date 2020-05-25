import { Model } from 'sequelize';

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
}

export default Usuarios;
