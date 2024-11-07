import { toDestinationNameUrl } from '@sap-cloud-sdk/connectivity';
import { resolveDestination } from '@sap-cloud-sdk/connectivity/internal';
import { createLogger } from '@sap-cloud-sdk/util';
import nodemailer from 'nodemailer';
import { SocksClient } from 'socks';
import {
  customAuthRequestHandler,
  customAuthResponseHandler
} from './socket-proxy';
import type { Socket } from 'node:net';
import type { SentMessageInfo, Transporter } from 'nodemailer';
import type { SocksClientOptions, SocksProxy } from 'socks';
// eslint-disable-next-line import/no-internal-modules
import type {
  MailClientOptions,
  MailConfig,
  MailDestination,
  MailResponse
} from './mail-client-types';
import type {
  Destination,
  DestinationOrFetchOptions
} from '@sap-cloud-sdk/connectivity';

const logger = createLogger({
  package: 'mail-client',
  messageContext: 'mail-client'
});

// TODO: refactor mail destination stuff to separate file?
function buildMailDestination(destination: Destination): MailDestination {
  const originalProperties = destination.originalProperties;
  if (!originalProperties) {
    throw Error(
      `The destination '${toDestinationNameUrl(
        destination
      )}' does not contain any properties.`
    );
  }
  const { host, port } = getHostAndPort(destination, originalProperties);
  const { username, password } = getCredentials(
    destination,
    originalProperties
  );
  const from = originalProperties['mail.from'];
  return {
    ...destination,
    host,
    port,
    username,
    password,
    from
  };
}

function getHostAndPort(
  destination: Destination,
  originalProperties: Record<string, any>
): { host: string; port: number } {
  const host = originalProperties['mail.smtp.host'];
  const port = originalProperties['mail.smtp.port'];

  if (!(host && port)) {
    throw Error(
      `The destination '${toDestinationNameUrl(
        destination
      )}' does not contain host or port information as properties. Please configure in the "Additional Properties" of the destination.`
    );
  }
  return { host, port: parseInt(port) };
}

function getCredentials(
  destination: Destination,
  originalProperties: Record<string, any>
): { username: string; password: string } {
  const username = originalProperties['mail.user'];
  const password = originalProperties['mail.password'];

  if (!(username && password)) {
    throw Error(
      `The destination '${toDestinationNameUrl(
        destination
      )}' does not contain user or password information as properties. The mail-client only supports basic authentication, so "user" and "password" are required.`
    );
  }
  return { username, password };
}

/**
 * @internal
 */
export function buildSocksProxy(mailDestination: MailDestination): SocksProxy {
  if (!mailDestination.proxyConfiguration) {
    throw Error(
      'The proxy configuration is undefined, which is mandatory for creating a socket connection.'
    );
  }

  const proxyAuthorization =
    mailDestination.proxyConfiguration['proxy-authorization'];
  if (!proxyAuthorization) {
    throw Error(
      'The proxy authorization is undefined, which is mandatory for creating a socket connection.'
    );
  }

  if (!mailDestination.cloudConnectorLocationId) {
    logger.debug(
      'The Cloud Connector locationID is undefined. The default Cloud Connector of the subaccount will be used which may result in errors.'
    );
  }

  return {
    host: mailDestination.proxyConfiguration.host,
    port: mailDestination.proxyConfiguration.port,
    type: 5,
    // socks doc here: https://github.com/JoshGlazebrook/socks#socksclientoptions
    // see customAuthRequestHandler and customAuthResponseHandler for custom auth details.
    custom_auth_method: 0x80,
    custom_auth_request_handler: () =>
      customAuthRequestHandler(
        proxyAuthorization,
        mailDestination.cloudConnectorLocationId
      ),
    custom_auth_response_size: 2,
    custom_auth_response_handler: customAuthResponseHandler
  };
}

async function createSocket(mailDestination: MailDestination): Promise<Socket> {
  const connectionOptions: SocksClientOptions = {
    proxy: buildSocksProxy(mailDestination),
    command: 'connect',
    destination: {
      host: mailDestination.host!,
      port: mailDestination.port!
    }
  };
  const { socket } = await SocksClient.createConnection(connectionOptions);
  return socket;
}

function createTransport(
  mailDestination: MailDestination,
  mailClientOptions?: MailClientOptions
): Transporter<SentMessageInfo> {
  const baseOptions = {
    pool: true,
    auth: {
      user: mailDestination.username,
      pass: mailDestination.password
    },
    host: mailDestination.host,
    port: mailDestination.port,
    proxy: `socks5://${mailDestination.proxyConfiguration?.host}:${mailDestination.proxyConfiguration?.port}`
  };

  return nodemailer.createTransport({
    ...baseOptions,
    ...mailClientOptions
  });
}

function buildMailConfigsFromDestination(
  mailDestination: MailDestination
): Partial<MailConfig> {
  const from = mailDestination.from;
  return { from };
}

async function sendMailInSequential<T extends MailConfig>(
  transport: Transporter,
  mailConfigsFromDestination: Partial<MailConfig>,
  mailConfigs: T[]
): Promise<MailResponse[]> {
  const response: MailResponse[] = [];
  for (const mailConfigIndex in mailConfigs) {
    logger.debug(
      `Sending email ${mailConfigIndex + 1}/${mailConfigs.length}...`
    );
    response[mailConfigIndex] = await transport.sendMail({
      ...mailConfigsFromDestination,
      ...mailConfigs[mailConfigIndex]
    });
    logger.debug(
      `...email ${mailConfigIndex + 1}/${mailConfigs.length} for subject "${
        mailConfigs[mailConfigIndex].subject
      }" was sent successfully.`
    );
  }
  return response;
}

async function sendMailInParallel<T extends MailConfig>(
  transport: Transporter,
  mailConfigsFromDestination: Partial<MailConfig>,
  mailConfigs: T[]
): Promise<MailResponse[]> {
  const promises: Promise<MailResponse>[] = mailConfigs.map(
    (mailConfig, mailConfigIndex, mailConfigsArray) => {
      logger.debug(
        `Sending email ${mailConfigIndex + 1}/${mailConfigsArray.length}...`
      );
      return transport.sendMail({
        ...mailConfigsFromDestination,
        ...mailConfig
      });
    }
  );

  return Promise.all(promises).then(responses => {
    responses.forEach((_, responseIndex) =>
      logger.debug(
        `...email ${responseIndex + 1}/${mailConfigs.length} for subject "${
          mailConfigs[responseIndex].subject
        }" was sent successfully`
      )
    );
    return responses;
  });
}

async function sendMailWithNodemailer<T extends MailConfig>(
  mailDestination: MailDestination,
  mailConfigs: T[],
  mailClientOptions?: MailClientOptions
): Promise<MailResponse[]> {
  let socket: Socket | undefined;
  const transport = createTransport(mailDestination, mailClientOptions);
  transport.set('proxy_handler_socks5', async (_, __, callback) => {
    socket = await createSocket(mailDestination);
    callback(null, { connection: socket });
  });

  const mailConfigsFromDestination =
    buildMailConfigsFromDestination(mailDestination);

  const response = isMailSentInSequential(mailClientOptions)
    ? await sendMailInSequential(
        transport,
        mailConfigsFromDestination,
        mailConfigs
      )
    : await sendMailInParallel(
        transport,
        mailConfigsFromDestination,
        mailConfigs
      );

  teardown(transport, socket);
  return response;
}

function teardown(transport: Transporter<SentMessageInfo>, socket?: Socket) {
  transport.close();
  logger.debug('SMTP transport connection closed.');
  if (socket) {
    socket.end();
    socket.destroy();
    logger.debug('Socks connection closed.');
  }
}

/**
 * Sends e-mails to a target mail server defined in a given destination.
 * Builds a transport between the application and the mail server, sends mails sequentially by using the transport, then closes it.
 * This function also does the destination look up, when passing `DestinationOrFetchOptions`.
 * @param destination - A destination or a destination name and a JWT.
 * @param mailConfigs - A single object or an array of {@link MailConfig}.
 * @param mailClientOptions - A {@link MailClientOptions} that defines the configurations of the mail client, e.g., how to set up an SMTP transport, including SSL and tls configurations.
 * @returns A promise resolving to an array of {@link MailResponse}.
 * @see https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destination#referencing-destinations-by-name
 */
export async function sendMail<T extends MailConfig>(
  destination: DestinationOrFetchOptions,
  mailConfigs: T | T[],
  mailClientOptions?: MailClientOptions
): Promise<MailResponse[]> {
  const resolvedDestination = await resolveDestination(destination);
  if (!!resolvedDestination.type && resolvedDestination.type !== 'MAIL') {
    throw Error(
      `The type of the destination '${toDestinationNameUrl(
        destination
      )}' has to be 'MAIL', but is '${destination.type}'.`
    );
  }

  const mailDestination = buildMailDestination(resolvedDestination);

  return sendMailWithNodemailer(
    mailDestination,
    transformToArray(mailConfigs),
    mailClientOptions
  );
}

function transformToArray<T>(singleElementOrArray: T | T[]): T[] {
  return Array.isArray(singleElementOrArray)
    ? singleElementOrArray
    : [singleElementOrArray];
}

/**
 * @internal
 */
export function isMailSentInSequential(
  mailClientOptions?: MailClientOptions
): boolean {
  return mailClientOptions?.sdkOptions?.parallel === false;
}
