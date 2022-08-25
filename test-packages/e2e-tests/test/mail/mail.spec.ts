import fs from 'fs';
import { join, resolve } from 'path';
import net from 'net';
import {
  MailOptions,
  MailResponse,
  sendMail
} from '@sap-cloud-sdk/mail-client';

describe('Mail', () => {
  const defaultMailOptions: MailOptions = {
    from: '"FROM" <from@example.com>',
    to: 'TO1@example.com, TO2@example.com',
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
  }, 60000);

  it('should send 100 mails', async () => {
    const mailOptions = buildArrayWithNatualNums(100).map(
      mailIndex =>
        ({
          ...defaultMailOptions,
          subject: `mail ${mailIndex}`
        } as MailOptions)
    );
    await sendTestMail(undefined, ...mailOptions);
    const mails = fs.readdirSync(join(resolve('test'), 'mail', 'test-output'));
    expect(mails.length).toBeGreaterThan(99);
  }, 60000);
});

async function sendTestMail(
  connection?: net.Socket,
  ...mailOptions: MailOptions[]
): Promise<MailResponse[]> {
  const originalProperties = {
    'mail.smtp.host': 'localhost',
    'mail.smtp.port': '5566',
    'mail.user': 'user',
    'mail.password': 'pd'
  };
  const destination: any = {
    type: 'MAIL',
    originalProperties
  };
  return sendMail(destination, ...mailOptions);
}

function buildArrayWithNatualNums(length): number[] {
  return Array.from({ length }, (_, i) => i + 1);
}
