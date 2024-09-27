import type { JwtPayload } from '@sap-cloud-sdk/connectivity';
import { decodeJwt } from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';

expectType<JwtPayload>(decodeJwt(''));
