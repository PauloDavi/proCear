import Mail from '../../lib/Mail';

class RecoverPassMail {
  get key() {
    return 'RecoverPassMail';
  }

  async handle({ data }) {
    const { name, email, link } = data;

    Mail.sendMail({
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

export default new RecoverPassMail();
