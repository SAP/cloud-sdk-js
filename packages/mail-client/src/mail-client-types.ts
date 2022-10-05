import { Readable } from 'stream';
import { Url } from 'url';
import { ConnectionOptions } from 'tls';
import net from 'net';
import {
  AuthenticationType,
  DestinationProxyType,
  ProxyConfiguration
} from '@sap-cloud-sdk/connectivity';

/**
 * Represents an e-mail address.
 * This interface is compatible with `Mail.Address` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface Address {
  /**
   * Name of the recipient.
   */
  name: string;
  /**
   * E-mail address of the recipient, e.g. `sender@server.com`.
   */
  address: string;
}

/**
 * Represents an object or array of additional header fields.
 * Prepared header values that are not folded or encoded by Nodemailer.
 * This type is compatible with `Headers` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export type Headers =
  | { [key: string]: string | string[] | { prepared: boolean; value: string } }
  | { key: string; value: string }[];

/**
 * Represents the structure of an attachment.
 * This interface is compatible with `AttachmentLike` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface AttachmentLike {
  /**
   * Contents of the attachment stored in a string, buffer or stream.
   */
  content?: string | Buffer | Readable | undefined;
  /**
   * File path or URL (data URIs are allowed as well) if you want to read a file instead of including it (better for larger attachments).
   */
  path?: string | Url | undefined;
}

/**
 * Represents an attachment.
 * This interface is compatible with `Attachment` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface Attachment extends AttachmentLike {
  /**
   * Filename to be reported as the name of the attached file, use of unicode is allowed. If you do not want to use a filename, set this value to false, otherwise a filename is generated automatically.
   */
  filename?: string | false | undefined;
  /**
   * Optional content id for using inline images in HTML message source. Using cid sets the default `contentDisposition` to 'inline' and moves the attachment into a multipart/related MIME node, so use it only if you actually want to use this attachment as an embedded image.
   */
  cid?: string | undefined;
  /**
   * Encoding used to encode the content to a buffer. Example values: base64, hex, binary etc. Useful if you want to use binary attachments in a JSON formatted e-mail object.
   */
  encoding?: string | undefined;
  /**
   * Content type of the attachment. Will be derived from the filename property, if not set.
   */
  contentType?: string | undefined;
  /**
   * Encoding for the attachment transfer. Will be derived from the `contentType` property, if not set. Example values: quoted-printable, base64. If it is unset then base64 encoding is used for the attachment. If set to false, the previous default applies (base64 for most, 7bit for text).
   */
  contentTransferEncoding?:
    | '7bit'
    | 'base64'
    | 'quoted-printable'
    | false
    | undefined;
  /**
   * Content disposition type of the attachment. Defaults to `attachment`.
   */
  contentDisposition?: 'attachment' | 'inline' | undefined;
  /**
   * Additional headers to be sent with the attachment.
   */
  headers?: Headers | undefined;
  /**
   * A raw value that overrides entire node content in the MIME message. If used, all other options set for this node are ignored.
   */
  raw?: string | Buffer | Readable | AttachmentLike | undefined;
}

/**
 * Represents configurations for sending an e-mail.
 * This interface is compatible with `Mail.Options` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface MailConfig {
  /**
   * The e-mail address of the sender. E-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>'.
   */
  from?: string | Address | undefined;
  /**
   * E-mail address that will appear in the "Sender:" field.
   */
  sender?: string | Address | undefined;
  /**
   * Comma separated list or array of recipients' e-mail addresses that will appear in the "To:" field.
   */
  to?: string | Address | (string | Address)[] | undefined;
  /**
   * Comma separated list or array of recipients' e-mail addresses that will appear in the "Cc:" field.
   */
  cc?: string | Address | (string | Address)[] | undefined;
  /**
   * Comma separated list or array of recipients e-mail addresses that will appear in the "Bcc:" field.
   */
  bcc?: string | Address | (string | Address)[] | undefined;
  /**
   * E-mail address that will appear in the "Reply-To:" field.
   */
  replyTo?: string | Address | undefined;
  /**
   * Subject of the e-mail.
   */
  subject?: string | undefined;
  /**
   * Plaintext version of the message.
   */
  text?: string | Buffer | Readable | AttachmentLike | undefined;
  /**
   * The HTML version of the message.
   */
  html?: string | Buffer | Readable | AttachmentLike | undefined;
  /**
   * Object or array with additional headers.
   */
  headers?: Headers | undefined;
  /**
   * Array of attachment objects.
   */
  attachments?: Attachment[] | undefined;
  /**
   * Date value, current UTC string will be used if not set.
   */
  date?: Date | string | undefined;
  /**
   * Transfer encoding for the textual parts.
   */
  encoding?: string | undefined;
  /**
   * Priority of the e-mail.
   */
  priority?: 'high' | 'normal' | 'low' | undefined;
}

/**
 * Represents an envelope that contains the e-mail addresses of the sender and the recipients.
 * This interface is compatible with `MimeNode.Envelope` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface Envelope {
  /**
   * E-mail address of the sender or `false` if it should not be shown.
   */
  from: string | false;
  /**
   * Array of e-mail addresses of recipients.
   */
  to: string[];
}

/**
 * Represents the response from the mail server.
 * This interface is compatible with `SMTPTransport.SentMessageInfo` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface MailResponse {
  /**
   * Envelope that contains the sender and recipients info.
   */
  envelope?: Envelope;
  /**
   * Array of e-mail addresses that accepted the requests.
   */
  accepted?: (string | Address)[];
  /**
   * Array of e-mail addresses that rejected the requests.
   */
  rejected?: (string | Address)[];
  /**
   * Array of e-mail addresses that are processing the requests.
   */
  pending?: (string | Address)[];
  /**
   * Other response message from the mail server.
   */
  response?: string;
}

/**
 * Represents a mail destination configured on the SAP Business Technology Platform.
 * Currently only `mail.transport.protocol` and `mail.smtp.provider.*` are considered.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * @internal
 */
export interface MailDestination {
  /**
   * Name of the destination.
   */
  name?: string | null;
  /**
   * Type of authentication.
   * Defaults to `NoAuthentication`, unless {@link username} and {@link password} are provided, in which case the default is `BasicAuthentication`.
   */
  authentication?: AuthenticationType;
  /**
   * Proxy type to specify whether the target resides on-premise (currently not used).
   */
  proxyType?: DestinationProxyType;
  /**
   * Type of the destination. Defaults to 'HTTP'.
   */
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
  /**
   * Further properties of the destination as defined in destination service on SAP Business Technology Platform, possibly empty.
   */
  originalProperties?: { [key: string]: any };
  /**
   * Host of the mail server.
   * Based on the additional destination property 'mail.smtp.host'.
   */
  host?: string;
  /**
   * Port of the mail server.
   * Based on the additional destination property 'mail.password'.
   */
  port?: number;
  /**
   * ProxyConfiguration for on-premise connectivity. Is present if proxyType of the destination equals "OnPremise".
   */
  proxyConfiguration?: ProxyConfiguration;
  /**
   * Sender info, e.g. e-mail address.
   * Based on the additional destination property 'mail.from'.
   */
  from?: string;
  /**
   * Username to use for basic authentication, optional if other means of authentication shall be used.
   * Based on the additional destination property 'mail.user'.
   */
  username?: string;
  /**
   * Password to use for basic authentication, optional if other means of authentication shall be used.
   * Based on the additional destination property 'mail.password'.
   */
  password?: string;
}

/**
 * Represents options for sending mails provided by the SDK. For example whether the mails are sent in parallel.
 */
export interface SDKOptions {
  /**
   * Option to define the strategy of sending emails. The emails will be sent in parallel when setting to true, otherwise in sequential. The default value is true.
   */
  parallel?: boolean;
}

/**
 * Represents options of the mail client.
 */
export interface MailClientOptions extends SmtpTransportOptions {
  /**
   * Defines the SDK behaviours, for example whether the mails are sent in parallel.
   */
  sdkOptions?: SDKOptions;
}

/**
 * Represents options for setting up the SMTP connection.
 * This interface is compatible with `SMTPConnection.Options` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface SmtpTransportOptions {
  /**
   * Defines if the connection should use SSL (if true) or not (if false).
   */
  secure?: boolean | undefined;
  /**
   * Turns off STARTTLS support if true.
   */
  ignoreTLS?: boolean | undefined;
  /**
   * Forces the client to use STARTTLS. Returns an error if upgrading the connection is not possible or fails.
   */
  requireTLS?: boolean | undefined;
  /**
   * Tries to use STARTTLS and continues normally if it fails.
   */
  opportunisticTLS?: boolean | undefined;
  /**
   * How many milliseconds to wait for the connection to establish.
   */
  connectionTimeout?: number | undefined;
  /**
   * How many milliseconds to wait for the greeting after connection is established.
   */
  greetingTimeout?: number | undefined;
  /**
   * How many milliseconds of inactivity to allow.
   */
  socketTimeout?: number | undefined;
  /**
   * If set to true, then logs SMTP traffic and message content, otherwise logs only transaction events.
   */
  debug?: boolean | undefined;
  /**
   * Defines additional options to be passed to the socket constructor.
   * @example
   * { rejectUnauthorized: true }
   */
  tls?: ConnectionOptions | undefined;
  /**
   * Initialized socket to use instead of creating a new one.
   */
  socket?: net.Socket | undefined;
  /**
   * Connected socket to use instead of creating and connecting a new one. If secure option is true, then socket is upgraded from plaintext to ciphertext.
   */
  connection?: net.Socket | undefined;
  /**
   * A proxy URL used for connecting the SMTP server. This value will be forwarded to the underlying `nodemailer` lib, so it handles the proxy job for the SDK.
   */
  proxy?: string;
}
