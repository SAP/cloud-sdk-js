import { MailResponse, sendMail } from '@sap-cloud-sdk/mail-client';
import { expectType } from 'tsd';

const mailConfig = { from: 'from', to: 'to' };

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, mailConfig)
);

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
    tls: {
      rejectUnauthorized: false
    }
  })
);

expectType<Promise<MailResponse[]>>(
  sendMail({ destinationName: 'dest' }, [mailConfig, mailConfig], {
    sdkOptions: {
      parallel: false
    }
  })
);
