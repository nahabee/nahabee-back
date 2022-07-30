/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands */
import { Request, RequestHandler, Response } from 'express';

const nodemailer = require('nodemailer');

interface IForm {
  name: string;
  email: string;
  message: string;
}

const sendMail = (async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body as IForm;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PWD_MAIL,
    },
  });

  const mailOptions = {
    from: 'ContactForm',
    sender: 'hello.nahabee@gmail.com',
    to: 'hello.nahabee@gmail.com',
    subject: 'Message reçu via le book de nahabee',
    text: `Vous avez reçu un mail de : ${email} !
        Nom : ${name}
        Message : ${message}`,
  };

  await transporter.sendMail(mailOptions, function (error: object, info: any) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
}) as RequestHandler;

export default { sendMail };
