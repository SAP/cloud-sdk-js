import { Readable } from 'stream';
import { Url } from 'url';
import {
  AuthenticationType,
  DestinationProxyType
} from '@sap-cloud-sdk/connectivity';
/**
 * Represents an email address.
 * This interface is compatible with `Mail.Address` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface Address {
  /**
   * Name of the email address.
   */
  name: string;
  /**
   * Email address like `sdk@sap.com`.
   */
  address: string;
}

/**
 * Represents an object or array of additional header fields
 * Prepared header values that are not folded or encoded by Nodemailer.
 * This type is compatible with `Headers` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export type Headers =
  | { [key: string]: string | string[] | { prepared: boolean; value: string } }
  | { key: string; value: string }[];

/**
 * Represents a basic structure of an attachment.
 * This interface is compatible with `AttachmentLike` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface AttachmentLike {
  /**
   * String, Buffer or a Stream contents for the attachment.
   */
  content?: string | Buffer | Readable | undefined;
  /**
   * Path to a file or an URL (data uris are allowed as well) if you want to stream the file instead of including it (better for larger attachments).
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
   * Filename to be reported as the name of the attached file, use of unicode is allowed. If you do not want to use a filename, set this value as false, otherwise a filename is generated automatically.
   */
  filename?: string | false | undefined;
  /**
   * Optional content id for using inline images in HTML message source. Using cid sets the default contentDisposition to 'inline' and moves the attachment into a multipart/related mime node, so use it only if you actually want to use this attachment as an embedded image.
   */
  cid?: string | undefined;
  /**
   * If set and content is string, then encodes the content to a Buffer using the specified encoding. Example values: base64, hex, binary etc. Useful if you want to use binary attachments in a JSON formatted e-mail object.
   */
  encoding?: string | undefined;
  /**
   * Optional content type for the attachment, if not set will be derived from the filename property.
   */
  contentType?: string | undefined;
  /**
   * Optional transfer encoding for the attachment, if not set it will be derived from the contentType property. Example values: quoted-printable, base64. If it is unset then base64 encoding is used for the attachment. If it is set to false then previous default applies (base64 for most, 7bit for text).
   */
  contentTransferEncoding?:
    | '7bit'
    | 'base64'
    | 'quoted-printable'
    | false
    | undefined;
  /**
   * Optional content disposition type for the attachment, defaults to `attachment`.
   */
  contentDisposition?: 'attachment' | 'inline' | undefined;
  /**
   * An object of additional headers.
   */
  headers?: Headers | undefined;
  /**
   * An optional value that overrides entire node content in the mime message. If used then all other options set for this node are ignored.
   */
  raw?: string | Buffer | Readable | AttachmentLike | undefined;
}

/**
 * Represents options for sending an email.
 * This interface is compatible with `Mail.Options` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface MailOptions {
  /**
   * The e-mail address of the sender. All e-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>'.
   */
  from?: string | Address | undefined;
  /**
   * An e-mail address that will appear on the Sender: field.
   */
  sender?: string | Address | undefined;
  /**
   * Comma separated list or an array of recipients e-mail addresses that will appear on the To: field.
   */
  to?: string | Address | (string | Address)[] | undefined;
  /**
   * Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field.
   */
  cc?: string | Address | (string | Address)[] | undefined;
  /**
   * Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field.
   */
  bcc?: string | Address | (string | Address)[] | undefined;
  /**
   * An e-mail address that will appear on the Reply-To: field.
   */
  replyTo?: string | Address | undefined;
  /**
   * The subject of the e-mail.
   */
  subject?: string | undefined;
  /**
   * The plaintext version of the message.
   */
  text?: string | Buffer | Readable | AttachmentLike | undefined;
  /**
   * An object or array of additional header fields.
   */
  headers?: Headers | undefined;
  /**
   * An array of attachment objects.
   */
  attachments?: Attachment[] | undefined;
  /**
   * Optional Date value, current UTC string will be used if not set.
   */
  date?: Date | string | undefined;
  /**
   * Optional transfer encoding for the textual parts.
   */
  encoding?: string | undefined;
  /**
   * The priority of the email.
   */
  priority?: 'high' | 'normal' | 'low' | undefined;
}

/**
 * Represents an envelope that contains the email addresses of the sender and the recipients.
 * This interface is compatible with `MimeNode.Envelope` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface Envelope {
  /**
   * The email address of the sender or is set to false.
   */
  from: string | false;
  /**
   * An array of email addresses of recipients.
   */
  to: string[];
}

/**
 * Represents the mail response from the mail server.
 * This interface is compatible with `SMTPTransport.SentMessageInfo` of `nodemailer`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface MailResponse {
  /**
   * An envelope that contains the sender and recipients info.
   */
  envelope?: Envelope;
  /**
   * An array of email addresses that accepted the requests.
   */
  accepted?: (string | Address)[];
  /**
   * An array of email addresses that rejected the requests.
   */
  rejected?: (string | Address)[];
  /**
   * An array of email addresses that are processing the requests.
   */
  pending?: (string | Address)[];
  /**
   * Other response message from the mail server.
   */
  response?: string;
}

/**
 * Represents a mail destination configured on the SAP Business Technology Platform.
 * Some keys of the originalProperties are ignored by the SDK for the time being including `mail.transport.protocol` and `mail.smtp.provider.*`.
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 */
export interface MailDestination {
  /**
   * Name of the destination retrieved from SAP Business Technology Platform.
   */
  name?: string | null;
  /**
   * Type of authentication to use.
   *
   * Defaults to `NoAuthentication`, unless {@link username} and {@link password} are provided, in which case the default is `BasicAuthentication`.
   */
  authentication?: AuthenticationType;
  /**
   * Proxy type to specify whether the target resides on-premise (not used).
   */
  proxyType?: DestinationProxyType;
  /**
   * The type of the destination, defaults to 'HTTP'. The SAP Cloud SDK only understands destinations of type 'HTTP' and 'MAIL'.
   */
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
  /**
   * Further properties of the destination as defined in destination service on SAP Business Technology Platform, possibly empty.
   */
  originalProperties?: { [key: string]: any };
  /**
   * Host of the mail server.
   * Parsed from originalProperties['mail.smtp.host'].
   */
  host?: string;
  /**
   * Port of the mail server.
   * Parsed from originalProperties['mail.password'].
   */
  port?: number;
  /**
   * Optional sender info defined in the destination properties.
   * Parsed from originalProperties['mail.from'].
   */
  from?: string;
  /**
   * Username to use for basic authentication, optional if other means of authentication shall be used.
   * Parsed from originalProperties['mail.user'].
   */
  username?: string;
  /**
   * Password to use for basic authentication, optional if other means of authentication shall be used.
   * Parsed from originalProperties['mail.password'].
   */
  password?: string;
}
