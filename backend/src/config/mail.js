export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: `ProCear <${process.env.MAIL_USER}>`,
    logo: `${process.env.WEB_URL}/assets/LogoCEAR.png`,
  },
};
