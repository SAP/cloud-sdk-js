import { decodeJwt } from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';
import type { JwtPayload } from '@sap-cloud-sdk/connectivity';

expectType<JwtPayload>(decodeJwt(''));
