import nodemailer from 'nodemailer';
import { sendMail } from './mail-client';
import { MailOptions } from './mail-client-types';

describe('mail client', () => {
  const mockMailer = {
    sendMail: jest.fn(),
    close: jest.fn()
  };

  it('should create transport, send mails and close the transport', async () => {
    const spyCreateTransport = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockMailer as any);
    const spySendMail = jest.spyOn(mockMailer, 'sendMail');
    const spyClose = jest.spyOn(mockMailer, 'close');
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
      to: 'to1@example.com',
      subject: 'subject',
      text: 'txt',
      attachments: [{ content: 'content' }]
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
