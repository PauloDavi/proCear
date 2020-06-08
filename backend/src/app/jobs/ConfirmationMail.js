import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { name, email, link } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'ProCear - Confirmação de cadastro',
      template: 'confirmation',
      context: {
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        link,
        solicitation_type: 'confirmação de cadastro',
      },
    });
  }
}

export default new ConfirmationMail();
