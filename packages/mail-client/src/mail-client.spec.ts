import nodemailer from 'nodemailer';
import { sendMail } from './mail-client';
import { MailOptions } from './mail-client-types';

describe('mail client', () => {
  class MockMailer {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    sendMail() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close() {}
  }
  it('should create transport, send mails and close the transport', async () => {
    const spyCreateTransport = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(new MockMailer() as any);
    const spySendMail = jest.spyOn(MockMailer.prototype, 'sendMail');
    const spyClose = jest.spyOn(MockMailer.prototype, 'close');
    const destination: any = {
      originalProperties: {
        'mail.password': 'password',
        'mail.user': 'user',
        'mail.smtp.host': 'smtp.gmail.com',
        'mail.smtp.port': '587'
      },
      name: 'my-destination',
      type: 'MAIL',
      authentication: 'BasicAuthentication',
      proxyType: 'Internet'
    };
    const mailOptions1: MailOptions = {
      from: 'from1@example.com',
      to: 'to1@example.com'
    };
    const mailOptions2: MailOptions = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };
    await expect(
      sendMail(destination, mailOptions1, mailOptions2)
    ).resolves.not.toThrow();
    expect(spyCreateTransport).toBeCalledTimes(1);
    expect(spySendMail).toBeCalledTimes(2);
    expect(spySendMail).toBeCalledWith(mailOptions1);
    expect(spySendMail).toBeCalledWith(mailOptions2);
    expect(spyClose).toBeCalledTimes(1);
  });
});
