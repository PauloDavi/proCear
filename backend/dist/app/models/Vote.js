"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
var _sequelize = require('sequelize');
var _uuid = require('uuid');

class Vote extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    );

    this.addHook('beforeCreate', (user) => (user.id = _uuid.v4.call(void 0, )));

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Project, { foreignKey: 'project_id' });
  }
}

exports. default = Vote;
