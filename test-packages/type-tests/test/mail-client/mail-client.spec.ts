import { sendMail } from '@sap-cloud-sdk/mail-client';

const mailConfig = { from: 'from', to: 'to' };

// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, mailConfig);
// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
  parallel: true
});
// $ExpectType Promise<MailResponse[]>
sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
  parallel: false
});
