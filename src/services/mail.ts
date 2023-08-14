// import nodemailer from 'nodemailer'

// const sendActivationEmail = async (email, activationLink) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASSWORD
//       }
//     })

//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: 'Account activation' + process.env.SERVER_URL,
//       text: 'activate your account',
//       html:
//         `
//             <div>
//                 <h1>For activation click the link</h1>
//                 <a href="${activationLink}">${activationLink}</a>
//             </div>
//         `
//     })
//   } catch (error) {
//     throw new Error('Failed during mail send');
//   }
// };

// export default sendActivationEmail;


import nodemailer from 'nodemailer';

class Mailer {
  transporter: any

  constructor() {
    this.transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationEmail(email, activationLink) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Account activation' + process.env.SERVER_URL,
        text: 'activate your account',
        html:
          `
            <div>
                <h1>For activation click the link</h1>
                <a href="${activationLink}">${activationLink}</a>
            </div>
          `
      });
    } catch (error) {
      throw new Error('Failed during mail send');
    }
  }

  async sendForgotPassRequestEmail(email, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Forgot Password' + process.env.SERVER_URL,
        text: 'Change your password',
        html:
          `
            <div>
                <h1>For change password click the link</h1>
                <a href="${link}">${link}</a>
            </div>
          `
      });
    } catch (error) {
      throw new Error('Failed during mail send');
    }
  }
}

export default new Mailer();
