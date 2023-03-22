import nock from 'nock';
import nodemailer from 'nodemailer';
import { SocksClient } from 'socks';
import {
  DestinationWithName,
  registerDestination
} from '@sap-cloud-sdk/connectivity';
import { DestinationConfiguration } from '@sap-cloud-sdk/connectivity/internal';
import * as tokenAccessor from '@sap-cloud-sdk/connectivity/dist/scp-cf/token-accessor';
import {
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockSubaccountDestinationsCall,
  providerServiceToken
} from '../../../test-resources/test/test-util';
import {
  buildSocksProxy,
  isMailSentInSequential,
  sendMail
} from './mail-client';
import {
  MailDestination,
  MailConfig,
  MailClientOptions
} from './mail-client-types';

describe('mail client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockSocket = {
    socket: {
      _readableState: {
        readableListening: false
      },
      end: jest.fn(),
      destroy: jest.fn()
    }
  };
  const mockTransport = {
    sendMail: jest.fn(),
    close: jest.fn(),
    verify: jest.fn()
  };

  it('should work with destination from service - proxy-type Internet', async () => {
    jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);
    const mailOptions1: MailConfig = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };

    const mailClientOptions: MailClientOptions = {
      proxy: 'http://my.proxy.com:25',
      tls: {
        rejectUnauthorized: false
      }
    };

    const mailDestinationResponse: DestinationConfiguration[] = [
      {
        Name: 'MyMailDestination',
        Type: 'MAIL',
        Authentication: 'BasicAuthentication',
        ProxyType: 'Internet',
        User: 'user',
        Password: 'password',
        'mail.password': 'password',
        'mail.user': 'user',
        'mail.smtp.host': 'smtp.gmail.com',
        'mail.smtp.port': '587'
      }
    ];
    mockServiceBindings();
    // the mockServiceToken() method does not work outside connectivity module.
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockImplementation((_, options) =>
        Promise.resolve(providerServiceToken)
      );
    mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
    mockSubaccountDestinationsCall(
      nock,
      mailDestinationResponse,
      200,
      providerServiceToken
    );

    await expect(
      sendMail(
        { destinationName: 'MyMailDestination' },
        [mailOptions1],
        mailClientOptions
      )
    ).resolves.not.toThrow();
  });

  it('should work with destination from service - proxy-type OnPremise', async () => {
    jest
      .spyOn(SocksClient, 'createConnection')
      .mockReturnValue(mockSocket as any);
    jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);
    const mailOptions1: MailConfig = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };

    const mailClientOptions: MailClientOptions = {
      tls: {
        rejectUnauthorized: false
      }
    };

    const mailDestinationResponse: DestinationConfiguration[] = [
      {
        Name: 'MyMailDestination',
        Type: 'MAIL',
        Authentication: 'BasicAuthentication',
        ProxyType: 'OnPremise',
        User: 'user',
        Password: 'password',
        'mail.password': 'password',
        'mail.user': 'user',
        'mail.smtp.host': 'smtp.gmail.com',
        'mail.smtp.port': '587'
      }
    ];
    mockServiceBindings();
    // the mockServiceToken() method does not work outside connectivity module.
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockImplementation((_, options) =>
        Promise.resolve(providerServiceToken)
      );
    mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
    mockSubaccountDestinationsCall(
      nock,
      mailDestinationResponse,
      200,
      providerServiceToken
    );

    await expect(
      sendMail(
        { destinationName: 'MyMailDestination' },
        [mailOptions1],
        mailClientOptions
      )
    ).resolves.not.toThrow();
  });

  it('should work with registered destination', async () => {
    jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);
    const mailOptions1: MailConfig = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };

    const mailClientOptions: MailClientOptions = {
      proxy: 'http://my.proxy.com:25',
      tls: {
        rejectUnauthorized: false
      }
    };

    mockServiceBindings();
    const mailDestination: DestinationWithName = {
      name: 'MyMailDestination',
      type: 'MAIL',
      authentication: 'BasicAuthentication',
      proxyType: 'Internet',
      username: 'user',
      password: 'password',
      originalProperties: {
        'mail.password': 'password',
        'mail.user': 'user',
        'mail.smtp.host': 'smtp.gmail.com',
        'mail.smtp.port': '587'
      }
    };

    registerDestination(mailDestination);
    await expect(
      sendMail(
        { destinationName: 'MyMailDestination' },
        [mailOptions1],
        mailClientOptions
      )
    ).resolves.not.toThrow();
  });

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

    const mailClientOptions: MailClientOptions = {
      proxy: 'http://my.proxy.com:25',
      tls: {
        rejectUnauthorized: false
      }
    };
    await expect(
      sendMail(destination, [mailOptions1, mailOptions2], mailClientOptions)
    ).resolves.not.toThrow();
    expect(spyCreateTransport).toBeCalledTimes(1);
    expect(spyCreateTransport).toBeCalledWith(
      expect.objectContaining(mailClientOptions)
    );
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
        protocol: 'socks',
        'proxy-authorization': 'jwt'
      }
    };
    const mailOptions: MailConfig = {
      from: 'from1@example.com',
      to: 'to1@example.com'
    };
    await expect(
      sendMail(destination, mailOptions, { sdkOptions: { parallel: false } })
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

describe('isMailSentInSequential', () => {
  it('should return false when the mail client options is undefined', () => {
    expect(isMailSentInSequential()).toBe(false);
  });

  it('should return false when the sdk options is undefined', () => {
    const mailClientOptions: MailClientOptions = {};
    expect(isMailSentInSequential(mailClientOptions)).toBe(false);
  });

  it('should return false when the parallel option is undefined', () => {
    const mailClientOptions: MailClientOptions = { sdkOptions: {} };
    expect(isMailSentInSequential(mailClientOptions)).toBe(false);
  });

  it('should return false when the parallel option is set to true', () => {
    const mailClientOptions: MailClientOptions = {
      sdkOptions: { parallel: true }
    };
    expect(isMailSentInSequential(mailClientOptions)).toBe(false);
  });

  it('should return true when the parallel option is set to false', () => {
    const mailClientOptions: MailClientOptions = {
      sdkOptions: { parallel: false }
    };
    expect(isMailSentInSequential(mailClientOptions)).toBe(true);
  });
});

describe('buildSocksProxy', () => {
  it('build valid socks proxy', () => {
    const dest: MailDestination = {
      proxyConfiguration: {
        host: 'www.proxy.com',
        port: 12345,
        protocol: 'socks',
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
