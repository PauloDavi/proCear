import crypto from 'crypto';

import Mail from '../../lib/Mail';
import Temp from '../models/Temp';
import User from '../models/User';

class PassRecoverController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const { email } = req.body;

    const user = User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Email not exist' });
    }

    const hash = crypto.randomBytes(32).toString('hex');

    const temp = Temp.create({
      hash,
    });

    if (!temp) {
      return res.status(500);
    }

    await Mail.sendMail({
      to: `<${email}>`,
      subject: 'recuperação de senha',
      template: 'recoverPassword',
      context: {
        image: `${process.env.APP_URL}/assets/LogoCEAR.png`,
        link: hash,
        solicitation_type: 'recuperação de senha',
      },
    });

    return res.status(200);
  }
}

export default new PassRecoverController();
