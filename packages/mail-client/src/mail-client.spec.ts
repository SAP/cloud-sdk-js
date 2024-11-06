import { EventEmitter } from 'node:stream';
import nodemailer from 'nodemailer';
import { SocksClient } from 'socks';
import { registerDestination } from '@sap-cloud-sdk/connectivity';
import * as tokenAccessor from '@sap-cloud-sdk/connectivity/dist/scp-cf/token-accessor';
import {
  mockFetchDestinationCalls,
  mockServiceBindings,
  providerServiceToken
} from '../../../test-resources/test/test-util';
import {
  buildSocksProxy,
  isMailSentInSequential,
  sendMail
} from './mail-client';
import type { DestinationConfiguration } from '@sap-cloud-sdk/connectivity/internal';
import type { DestinationWithName } from '@sap-cloud-sdk/connectivity';
import type {
  MailDestination,
  MailConfig,
  MailClientOptions
} from './mail-client-types';

describe('mail client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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

    const mailDestinationResponse: DestinationConfiguration = {
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
    };

    mockServiceBindings();
    // the mockServiceToken() method does not work outside connectivity module.
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockImplementation(() => Promise.resolve(providerServiceToken));
    mockFetchDestinationCalls(mailDestinationResponse);

    await expect(
      sendMail(
        { destinationName: mailDestinationResponse.Name },
        [mailOptions1],
        mailClientOptions
      )
    ).resolves.not.toThrow();
  });

  it('should work with destination from service - proxy-type OnPremise', async () => {
    const { connection } = mockSocketConnection();
    jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue(mockTransport as any);

    jest.spyOn(mockTransport, 'sendMail').mockImplementation(() => {
      connection.socket.on('data', () => {});
    });

    const mailOptions1: MailConfig = {
      from: 'from2@example.com',
      to: 'to2@example.com'
    };

    const mailClientOptions: MailClientOptions = {
      tls: {
        rejectUnauthorized: false
      }
    };

    const mailDestinationResponse: DestinationConfiguration = {
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
    };

    mockServiceBindings();
    // the mockServiceToken() method does not work outside connectivity module.
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockImplementation(() => Promise.resolve(providerServiceToken));

    mockFetchDestinationCalls(mailDestinationResponse);

    await expect(
      sendMail(
        { destinationName: mailDestinationResponse.Name },
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
    expect(spyCreateTransport).toHaveBeenCalledTimes(1);
    expect(spyCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining(mailClientOptions)
    );
    expect(spySendMail).toHaveBeenCalledTimes(2);
    expect(spySendMail).toHaveBeenCalledWith(mailOptions1);
    expect(spySendMail).toHaveBeenCalledWith(mailOptions2);
    expect(spyCloseTransport).toHaveBeenCalledTimes(1);
  });

  describe('on premise', () => {
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

    const destination465: any = {
      ...destination,
      originalProperties: {
        ...destination.originalProperties,
        'mail.smtp.port': '465'
      },
      proxyConfiguration: {
        ...destination.proxyConfiguration,
        port: 465
      }
    }

    const mailOptions: MailConfig = {
      from: 'from1@example.com',
      to: 'to1@example.com'
    };

    it('should create transport/socket, send mails and close the transport/socket', async () => {
      const { connection, createConnectionSpy } = mockSocketConnection();
      const spyCreateTransport = jest
        .spyOn(nodemailer, 'createTransport')
        .mockReturnValue(mockTransport as any);
      const spySendMail = jest
        .spyOn(mockTransport, 'sendMail')
        .mockImplementation(() => {
          connection.socket.on('data', () => {});
        });

      const spyCloseTransport = jest.spyOn(mockTransport, 'close');
      const spyEndSocket = jest.spyOn(connection.socket, 'end');
      const spyDestroySocket = jest.spyOn(connection.socket, 'destroy');

      await expect(
        sendMail(destination, mailOptions, { sdkOptions: { parallel: false } })
      ).resolves.not.toThrow();
      expect(createConnectionSpy).toHaveBeenCalledTimes(1);
      expect(spyCreateTransport).toHaveBeenCalledTimes(1);
      expect(spySendMail).toHaveBeenCalledTimes(1);
      expect(spySendMail).toHaveBeenCalledWith(mailOptions);
      expect(spyCloseTransport).toHaveBeenCalledTimes(1);
      expect(spyEndSocket).toHaveBeenCalledTimes(1);
      expect(spyDestroySocket).toHaveBeenCalledTimes(1);
    });

    it('should resend greeting if port 587', async () => {
      const { connection } = mockSocketConnection();
      jest
        .spyOn(nodemailer, 'createTransport')
        .mockReturnValue(mockTransport as any);

      const req = sendMail(destination, mailOptions, {
        sdkOptions: { parallel: false }
      });

      // The socket emits data for the first time before nodemailer listens to it.
      // We re-emit the data until a listener listened for it.
      // In this test we listen for the data event to check that we in fact re-emit the message.
      const emitsTwice = new Promise(resolve => {
        let dataEmitCount = 0;
        const collectedData: string[] = [];
        connection.socket.on('data', data => {
          dataEmitCount++;
          collectedData.push(data.toString());
          if (dataEmitCount === 2) {
            resolve(collectedData);
          }
        });
      });

      await expect(emitsTwice).resolves.toEqual([
        '220 smtp.gmail.com ESMTP',
        '220 smtp.gmail.com ESMTP'
      ]);
      await expect(req).resolves.not.toThrow();
    });

    it('should not try to resend greeting if port 465', async () => {
      const { connection } = mockSocketConnection();
      jest
        .spyOn(nodemailer, 'createTransport')
        .mockReturnValue(mockTransport as any);

      const req = sendMail(destination465, mailOptions, {
        sdkOptions: { parallel: false }
      });

      const dataEmit = new Promise((resolve, reject) => {
        let dataEmitCount = 0;
        const collectedData: string[] = [];
        connection.socket.on('data', data => {
          dataEmitCount++;
          collectedData.push(data.toString());
          if (dataEmitCount === 2) {
            reject('Should not emit data twice');
          }
        });
        setTimeout(() => resolve(collectedData), 4000);
      });
      
      await expect(dataEmit).resolves.toEqual([
        '220 smtp.gmail.com ESMTP'
      ]);
      await expect(req).resolves.not.toThrow();
    });

    it('should fail if nodemailer never listens to greeting when using port 587', async () => {
      mockSocketConnection();

      jest
        .spyOn(nodemailer, 'createTransport')
        .mockReturnValue(mockTransport as any);

      const req = sendMail(destination, mailOptions, {
        sdkOptions: { parallel: false }
      });

      await expect(req).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Failed to re-emit greeting message. No data listener found."'
      );
    }, 15000);

    it('should throw if greeting (really) was not received', async () => {
      const { connection } = mockSocketConnection(true);

      jest.spyOn(mockTransport, 'sendMail').mockImplementation(() => {
        connection.socket.on('data', () => {});
      });

      await expect(() =>
        sendMail(destination, mailOptions, {
          sdkOptions: { parallel: false }
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot('"Something went wrong"');
    });
  });
});

describe('isMailSentInSequential', () => {
  it('should return false when the mail client options are undefined', () => {
    expect(isMailSentInSequential()).toBe(false);
  });

  it('should return false when the sdk options are undefined', () => {
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

function mockSocketConnection(fail = false) {
  class MockSocket extends EventEmitter {
    end = jest.fn();
    destroy = jest.fn();
  }

  const connection = {
    socket: new MockSocket()
  };
  const createConnectionSpy = jest
    .spyOn(SocksClient, 'createConnection')
    .mockImplementation(() => {
      setImmediate(() => {
        if (fail) {
          connection.socket.emit('error', 'Something went wrong');
        } else {
          connection.socket.emit('data', '220 smtp.gmail.com ESMTP');
        }
      });
      return connection as any;
    });

  return { connection, createConnectionSpy };
}
