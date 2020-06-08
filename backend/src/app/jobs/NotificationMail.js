import Mail from '../../lib/Mail';

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {
    const { name, description } = data;

    Mail.sendMail({
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

export default new NotificationMail();
