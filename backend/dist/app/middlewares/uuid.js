"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Middleware que verifica se o UUID enviado é valido, usado em rotas que listao usuarios pelo id
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

exports. default = async (req, res, next) => {
  const { id } = req.params;

  if (!_validator2.default.isUUID(id)) {
    return res.status(401).json({ error: 'Id invalid' });
  }

  return next();
};
