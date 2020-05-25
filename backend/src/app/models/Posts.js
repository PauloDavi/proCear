import { Model } from 'sequelize';

class Posts extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
}

export default Posts;
