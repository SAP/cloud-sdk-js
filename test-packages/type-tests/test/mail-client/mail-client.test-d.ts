import { sendMail } from '@sap-cloud-sdk/mail-client';
import { expectType } from 'tsd';
import type { MailResponse } from '@sap-cloud-sdk/mail-client';

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
