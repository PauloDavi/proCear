import { Model } from 'sequelize';

class Projetos extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
}

export default Projetos;
