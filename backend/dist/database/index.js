"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable comma-dangle */
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _Post = require('../app/models/Post'); var _Post2 = _interopRequireDefault(_Post);
var _Project = require('../app/models/Project'); var _Project2 = _interopRequireDefault(_Project);
var _Suggestion = require('../app/models/Suggestion'); var _Suggestion2 = _interopRequireDefault(_Suggestion);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Vote = require('../app/models/Vote'); var _Vote2 = _interopRequireDefault(_Vote);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Project2.default, _Post2.default, _Suggestion2.default, _Vote2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Inicia conexão com banco de dados
    this.connection = new (0, _sequelize2.default)(_database2.default);

    // Conecta todos os modelos do array models com o banco e faz as associações caso existam
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

exports. default = new Database();
