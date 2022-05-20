import nodemailer from 'nodemailer';
import fs from 'fs';
import {join, resolve} from "path";
import SMTPTransport from "nodemailer/lib/smtp-transport";

describe('Mail', () => {
  it('should send a mail', async () => {
    await sendTestMail();
    const mail = fs.readFileSync(join(resolve('test'), 'mail', 'test-output', 'mail.txt'),
      { encoding: 'utf8'});
    expect(mail).toContain('To: TO1@example.com, TO2@example.com');
    expect(mail).toContain('Subject: SUBJECT');
    expect(mail).toContain('TEXT');
  });
});

async function sendTestMail(): Promise<SMTPTransport.SentMessageInfo>{
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 5566,
    // true for 465, false for other ports
    secure: false,
    auth: {
      user: 'user',
      pass: 'pd',
    },
    tls:{
      // disable tls config to fix the self signed certificate error
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"FROM" <from@example.com>', // sender address
    to: "TO1@example.com, TO2@example.com", // list of receivers
    subject: "SUBJECT",
    text: "TEXT",
  });
}
