import nodemailer from 'nodemailer';
import { SocksClient } from 'socks';
import { Protocol } from '@sap-cloud-sdk/connectivity';
import { buildSocksProxy, sendMail } from './mail-client';
import { MailDestination, MailConfig } from './mail-client-types';

describe('mail client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockSocket = {
    socket: {
      end: jest.fn(),
      destroy: jest.fn()
    }
  };
  const mockTransport = {
    sendMail: jest.fn(),
    close: jest.fn()
  };

  it('should create transport, send mails and close the transport', async () => {
    const spyCreateTransport = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);
    const spySendMail = jest.spyOn(mockTransport, 'sendMail');
    const spyCloseTransport = jest.spyOn(mockTransport, 'close');
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
    const mailOptions1: MailConfig = {
      from: 'from1@example.com',
      to: 'to1@example.com',
      subject: 'subject',
      text: 'txt',
      html: 'html',
      attachments: [{ content: 'content' }]
    };
    const mailOptions2: MailConfig = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };
    await expect(
      sendMail(destination, [mailOptions1, mailOptions2])
    ).resolves.not.toThrow();
    expect(spyCreateTransport).toBeCalledTimes(1);
    expect(spySendMail).toBeCalledTimes(2);
    expect(spySendMail).toBeCalledWith(mailOptions1);
    expect(spySendMail).toBeCalledWith(mailOptions2);
    expect(spyCloseTransport).toBeCalledTimes(1);
  });

  it('[OnPrem] should create transport/socket, send mails and close the transport/socket', async () => {
    const spyCreateSocket = jest
      .spyOn(SocksClient, 'createConnection')
      .mockReturnValue(mockSocket as any);
    const spyCreateTransport = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);
    const spySendMail = jest.spyOn(mockTransport, 'sendMail');
    const spyCloseTransport = jest.spyOn(mockTransport, 'close');
    const spyEndSocket = jest.spyOn(mockSocket.socket, 'end');
    const spyDestroySocket = jest.spyOn(mockSocket.socket, 'destroy');
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
      proxyType: 'OnPremise',
      proxyConfiguration: {
        host: 'smtp.gmail.com',
        port: 587,
        protocol: Protocol.SOCKS,
        'proxy-authorization': 'jwt'
      }
    };
    const mailOptions: MailConfig = {
      from: 'from1@example.com',
      to: 'to1@example.com'
    };
    await expect(
      sendMail(destination, mailOptions, { parallel: false })
    ).resolves.not.toThrow();
    expect(spyCreateSocket).toBeCalledTimes(1);
    expect(spyCreateTransport).toBeCalledTimes(1);
    expect(spySendMail).toBeCalledTimes(1);
    expect(spySendMail).toBeCalledWith(mailOptions);
    expect(spyCloseTransport).toBeCalledTimes(1);
    expect(spyEndSocket).toBeCalledTimes(1);
    expect(spyDestroySocket).toBeCalledTimes(1);
  });
});

describe('buildSocksProxy', () => {
  it('build valid socks proxy', () => {
    const dest: MailDestination = {
      proxyConfiguration: {
        host: 'www.proxy.com',
        port: 12345,
        protocol: Protocol.SOCKS,
        'proxy-authorization': 'jwt'
      }
    };
    const proxy = buildSocksProxy(dest);
    expect(isValidSocksProxy(proxy)).toBe(true);
  });
});

// copied from socks lib
function isValidSocksProxy(proxy) {
  return (
    proxy &&
    (typeof proxy.host === 'string' || typeof proxy.ipaddress === 'string') &&
    typeof proxy.port === 'number' &&
    proxy.port >= 0 &&
    proxy.port <= 65535 &&
    (proxy.type === 4 || proxy.type === 5)
  );
}
