import { decodeJwt, JwtPayload } from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';

expectType<JwtPayload>(decodeJwt(''));
