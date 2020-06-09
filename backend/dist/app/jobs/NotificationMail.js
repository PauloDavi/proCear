"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {
    const { name, description } = data;

    _Mail2.default.sendMail({
      to: 'Davi <paulo.araujo@cear.ufpb.br>',
      subject: 'Notificação de sugestão',
      template: 'notification',
      context: {
        student: name,
        suggests: description,
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        solicitation_type: 'notificação de sugestão',
      },
    });
  }
}

exports. default = new NotificationMail();
