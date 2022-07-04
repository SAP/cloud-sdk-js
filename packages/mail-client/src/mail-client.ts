import {
  Destination,
  DestinationOrFetchOptions,
  resolveDestinationWithType,
  toDestinationNameUrl
} from '@sap-cloud-sdk/connectivity';
import { createLogger } from '@sap-cloud-sdk/util';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { MailOptions, MailResponse } from './mail-cleint-types';

const logger = createLogger({
  package: 'mail-client',
  messageContext: 'mail-client'
});

function getMailDestinationOriginalProperties(
  destination: Destination
): Record<string, any> {
  const originalProperties = destination.originalProperties;
  if (!originalProperties) {
    throw Error(
      `The destination '${toDestinationNameUrl(
        destination
      )}' does not contain property configurations.`
    );
  }
  return originalProperties;
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
      )}' does not contain host or port information as properties.`
    );
  }
  return { host, port: parseInt(port) };
}

function getCredentials(
  destination: Destination,
  originalProperties: Record<string, any>
): { user: string; password: string } {
  const user = originalProperties['mail.user'];
  const password = originalProperties['mail.password'];

  if (!(user && password)) {
    throw Error(
      `The destination '${toDestinationNameUrl(
        destination
      )}' does not contain user or password information as properties.`
    );
  }
  return { user, password };
}

function createTransport(
  destination: Destination,
  originalProperties: Record<string, any>
): Transporter<SentMessageInfo> {
  const { host, port } = getHostAndPort(destination, originalProperties);
  const { user, password } = getCredentials(destination, originalProperties);

  return nodemailer.createTransport({
    host,
    port,
    // Defines if the connection should use SSL (if true) or not (if false).
    secure: false,
    auth: {
      user,
      pass: password
    },
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
  originalProperties: Record<string, any>
): Partial<MailOptions> {
  const from = originalProperties['mail.from'];
  return { from };
}

async function sendMailWithNodemailer<T extends MailOptions>(
  destination: Destination,
  originalProperties: Record<string, any>,
  ...mailOptions: T[]
): Promise<MailResponse[]> {
  const transporter = createTransport(destination, originalProperties);
  const mailOptionsFromDestination =
    buildMailOptionsFromDestination(originalProperties);

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
 * Builds a `Transport` between the application and the mail server, sends mails by using the `Transport`, then close it.
 * This function also does the destination look up, when passing [[DestinationFetchOptions]] instead of [[Destination]].
 * @param destination - A destination or a destination name and a JWT.
 * @param mailOptions - Any object representing [[MailOptions]].
 * @returns A promise resolving to an array of [[MailResponse]].
 * @see https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destination#referencing-destinations-by-name
 */
export async function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  ...mailOptions: T[]
): Promise<MailResponse[]> {
  const resolvedDestination = await resolveDestinationWithType(
    destination,
    'MAIL'
  );
  const originalProperties =
    getMailDestinationOriginalProperties(resolvedDestination);

  return sendMailWithNodemailer(
    resolvedDestination,
    originalProperties,
    ...mailOptions
  );
}
