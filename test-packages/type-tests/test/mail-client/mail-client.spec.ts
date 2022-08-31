import { sendMail } from '@sap-cloud-sdk/mail-client';

const mailOptions = { from: 'from', to: 'to' };

// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, {}, mailOptions);
// $ExpectType Promise<MailResponse[]>
sendMail(
  { destinationName: 'dest' },
  { parallel: true },
  mailOptions,
  mailOptions
);
// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, { parallel: false }, [
  mailOptions,
  mailOptions
]);
