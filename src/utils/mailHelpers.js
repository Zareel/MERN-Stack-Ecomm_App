import transporter from "../config/transporter.js";
import config from "../config/index.js";

const mailHelper = async (options) => {
  const message = {
    from: config.SMTP_MAIL_EMAIL, //S
    to: options.email, //list of receivers
    subject: options.subject,
    text: options.text,
    //html: <b>Hello world</b>,// html body incase you have to send any html data
  };
  await transporter.sendMail(message);
};
export default mailHelper;
