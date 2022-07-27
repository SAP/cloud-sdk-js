import {
  Destination,
  DestinationOrFetchOptions,
  toDestinationNameUrl
} from '@sap-cloud-sdk/connectivity';
import { resolveDestination } from '@sap-cloud-sdk/connectivity/internal';
import {
  createLogger,
  transformVariadicArgumentToArray
} from '@sap-cloud-sdk/util';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import {
  MailDestination,
  MailOptions,
  MailResponse
} from './mail-client-types';

const logger = createLogger({
  package: 'mail-client',
  messageContext: 'mail-client'
});

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

function createTransport(
  mailDestination: MailDestination
): Transporter<SentMessageInfo> {
  return nodemailer.createTransport({
    host: mailDestination.host,
    port: mailDestination.port,
    // Defines if the connection should use SSL (if true) or not (if false).
    secure: false,
    auth: {
      user: mailDestination.username,
      pass: mailDestination.password
    },
    // TODO: Uploading certificates on CF like HTTP destination is not applicable for MAIL destination.
    // Provide an API option for the users, so they can pass it as parameter for the nodemailer.
    // The `tls` is the right key:
    //     tls: {
    //       cert: xxx,
    //       ca: xxx,
    //       rejectUnauthorized: xxx
    //     }
    tls: {
      /**
       * If true the server will reject any connection which is not
       * authorized with the list of supplied CAs. This option only has an
       * effect if requestCert is true.
       */
      /** Disable tls config to fix the self signed certificate error. */
      rejectUnauthorized: false
    }
  });
}

function buildMailOptionsFromDestination(
  mailDestination: MailDestination
): Partial<MailOptions> {
  const from = mailDestination.from;
  return { from };
}

async function sendMailWithNodemailer<T extends MailOptions>(
  mailDestination: MailDestination,
  ...mailOptions: T[]
): Promise<MailResponse[]> {
  const transporter = createTransport(mailDestination);
  const mailOptionsFromDestination =
    buildMailOptionsFromDestination(mailDestination);

  const response: MailResponse[] = [];
  for (const mailOptionIndex in mailOptions) {
    logger.debug(
      `Sending email ${mailOptionIndex + 1}/${mailOptions.length}...`
    );
    response[mailOptionIndex] = await transporter.sendMail({
      ...mailOptionsFromDestination,
      ...mailOptions[mailOptionIndex]
    });
    logger.debug(
      `...email ${mailOptionIndex + 1}/${mailOptions.length} for subject "${
        mailOptions[mailOptionIndex].subject
      }" was sent successfully.`
    );
  }

  transporter.close();
  return response;
}

/**
 * Sends emails to a target mail server defined in a given destination.
 * Builds a `Transporter` between the application and the mail server, sends mails sequentially by using the `Transporter`, then closes it.
 * This function also does the destination look up, when passing {@link DestinationFetchOptions}.
 * @param destination - A destination or a destination name and a JWT.
 * @param mailOptions - Any objects representing {@link MailOptions}. Both array and varargs are supported.
 * @returns A promise resolving to an array of {@link MailResponse}.
 * @see https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destination#referencing-destinations-by-name
 */
export async function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  ...mailOptions: T[]
): Promise<MailResponse[]>;
export async function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  mailOptions: T[]
): Promise<MailResponse[]>;
/* eslint-disable jsdoc/require-jsdoc */
export async function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  first: T | T[],
  ...rest: T[]
): Promise<MailResponse[]> {
  const mailOptions = transformVariadicArgumentToArray(first, rest);

  const resolvedDestination = await resolveDestination(destination);
  if (!!resolvedDestination.type && resolvedDestination.type !== 'MAIL') {
    throw Error(
      `The type of the destination '${toDestinationNameUrl(
        destination
      )}' has to be 'MAIL', but is '${destination.type}'.`
    );
  }

  const mailDestination = buildMailDestination(resolvedDestination);

  return sendMailWithNodemailer(mailDestination, ...mailOptions);
}
/* eslint-enable jsdoc/require-jsdoc */
