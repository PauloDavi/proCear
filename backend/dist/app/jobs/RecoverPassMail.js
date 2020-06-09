"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class RecoverPassMail {
  get key() {
    return 'RecoverPassMail';
  }

  async handle({ data }) {
    const { name, email, link } = data;

    _Mail2.default.sendMail({
      to: `${name} <${email}>`,
      subject: 'ProCear - Recuperação de senha',
      template: 'recoverPassword',
      context: {
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        link,
        solicitation_type: 'confirmação de cadastro',
      },
    });
  }
}

exports. default = new RecoverPassMail();
