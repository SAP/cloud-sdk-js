import { Readable } from "stream";
import { Url } from "url";
import SMTPTransport from "nodemailer/lib/smtp-transport";
/**
 * This interface is compatible with `Mail.Address` of `nodemailer`.
 */
export interface Address {
  name: string;
  address: string;
}

/**
 * This type is compatible with `Headers` of `nodemailer`.
 */
export type Headers = { [key: string]: string | string[] | { prepared: boolean, value: string } } | Array<{ key: string, value: string }>;

/**
 * This interface is compatible with `AttachmentLike` of `nodemailer`.
 */
export interface AttachmentLike {
  content?: string | Buffer | Readable | undefined;
  path?: string | Url | undefined;
}
/**
 * This interface is compatible with `Attachment` of `nodemailer`.
 */
export interface Attachment extends AttachmentLike {
  filename?: string | false | undefined;
  cid?: string | undefined;
  encoding?: string | undefined;
  contentType?: string | undefined;
  contentTransferEncoding?: '7bit' | 'base64' | 'quoted-printable' | false | undefined;
  contentDisposition?: 'attachment' | 'inline' | undefined;
  headers?: Headers | undefined;
  raw?: string | Buffer | Readable | AttachmentLike | undefined;
}
/**
 * This interface is compatible with `Mail.Options` of `nodemailer`.
 */
export interface MailOptions {
  from: string | Address | undefined;
  sender?: string | Address | undefined;
  to: string | Address | Array<string | Address> | undefined;
  cc?: string | Address | Array<string | Address> | undefined;
  bcc?: string | Address | Array<string | Address> | undefined;
  replyTo?: string | Address | undefined;
  subject?: string | undefined;
  text?: string | Buffer | Readable | AttachmentLike | undefined;
  headers?: Headers | undefined;
  attachments?: Attachment[] | undefined;
  date?: Date | string | undefined;
  encoding?:
    | string
    | undefined;
  priority?: 'high' | 'normal' | 'low' | undefined;
}
/**
 * This interface is compatible with `MimeNode.Envelope` of `nodemailer`.
 */
export interface Envelope {
  from: string | false;
  to: string[];
}
/**
 * This interface is compatible with `SMTPTransport.SentMessageInfo` of `nodemailer`.
 */
export interface MailResponse {
  envelope?: Envelope;
  accepted?: Array<string | Address>;
  rejected?: Array<string | Address>;
  pending?: Array<string | Address>;
  response?: string;
}
