import nodeMailer from "nodemailer";
import config from "./index.js";

const transporter = nodeMailer.createTransport({
  host: config.SMTP_MAIL_HOST,
  port: config.SMTP_MAIL_PORT,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: config.SMTP_MAIL_USERNAME,
    pass: config.SMTP_MAIL_PASSWORD,
  },
});

export default transporter;
