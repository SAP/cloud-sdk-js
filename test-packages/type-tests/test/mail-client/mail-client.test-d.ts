import { MailResponse, sendMail } from '@sap-cloud-sdk/mail-client';
import { expectType } from 'tsd';

const mailConfig = { from: 'from', to: 'to' };

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, mailConfig)
);

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
    parallel: true
  })
);

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
    parallel: false
  })
);
