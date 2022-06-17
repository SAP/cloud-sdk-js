import fs from 'fs';
import { join, resolve } from 'path';
import net from 'net';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

describe('Mail', () => {
  const defaultMailOptions: Mail.Options = {
    from: '"FROM" <from@example.com>', // sender address
    to: 'TO1@example.com, TO2@example.com', // list of receivers
    subject: 'SUBJECT',
    text: 'TEXT'
  };

  it('should send a mail', async () => {
    await sendTestMail(undefined, defaultMailOptions);

    const mails = fs.readdirSync(join(resolve('test'), 'mail', 'test-output'));
    expect(
      mails.some(mail => {
        const mailDetails = fs.readFileSync(
          join(resolve('test'), 'mail', 'test-output', mail),
          { encoding: 'utf8' }
        );
        return (
          mailDetails.includes('To: TO1@example.com, TO2@example.com') &&
          mailDetails.includes('Subject: SUBJECT') &&
          mailDetails.includes('TEXT')
        );
      })
    ).toBe(true);
  });

  it('should send 100 mails', async () => {
    const mailOptions = buildArrayWithNatualNums(100).map(
      mailIndex =>
        ({
          ...defaultMailOptions,
          subject: `mail ${mailIndex}`
        } as Mail.Options)
    );
    await sendTestMail(undefined, ...mailOptions);
    const mails = fs.readdirSync(join(resolve('test'), 'mail', 'test-output'));
    expect(mails.length).toBeGreaterThan(99);
  }, 60000);
});

async function sendTestMail(
  connection?: net.Socket,
  ...mailOptions: Mail.Options[]
): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    connection,
    host: 'localhost',
    port: 5566,
    // true for 465, false for other ports
    secure: false,
    auth: {
      user: 'user',
      pass: 'pd'
    },
    tls: {
      // disable tls config to fix the self signed certificate error
      rejectUnauthorized: false
    }
  });

  for (const mailOptionIndex in mailOptions) {
    // eslint-disable-next-line no-console
    console.log(`Sending email ${mailOptionIndex}/${mailOptions.length}...`);
    const response = await transporter.sendMail(mailOptions[mailOptionIndex]);
    // eslint-disable-next-line no-console
    console.log(
      `...email ${mailOptionIndex}/${mailOptions.length} for subject "${mailOptions[mailOptionIndex].subject}" was sent successfully.`
    );
  }
  transporter.close();
  // eslint-disable-next-line no-console
  console.log('SMTP transport connection closed.');
}

function buildArrayWithNatualNums(length): number[] {
  return Array.from({ length }, (_, i) => i + 1);
}

// challenge
//
//
// 1. sending mail
// 1.1 using SMTP protocol
//   [colleague tested] [our PoC] chosen lib `nodemailer`
// 1.2 using socket protocol
//   [blocked] tried WS.WebSocket
//     auth ('auth' header) + email properties (from/to...) cannot config
//
// 2. on prem
// 2.1 http proxy (later)
//   [assume working] 'proxy-auth' header
//   [not tested][complicated implementation]
//   https://github.com/TooTallNate/node-http-proxy-agent/blob/master/src/agent.ts#L83
// 2.2 socket proxy (our first implementation)
//   [colleagues tested] '0x08' OAuth with JWT
//
// 3. using proxy config from env
// 3.1 basic auth
//   http://user:pd@proxy-host:1234
// 3.2 oauth
//    no ideas
