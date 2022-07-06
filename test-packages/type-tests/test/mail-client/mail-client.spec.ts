import { sendMail } from '@sap-cloud-sdk/mail-client';

const mailOptions = { from: 'from', to: 'to' };

// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, mailOptions);
// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, mailOptions, mailOptions);
// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, [mailOptions, mailOptions]);
