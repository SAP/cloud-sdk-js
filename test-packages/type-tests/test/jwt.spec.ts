import { decodeJwt } from '@sap-cloud-sdk/connectivity';
import { JwtPayload } from 'jsonwebtoken';

// $ExpectType JwtPayload
const jwtPayload: JwtPayload = decodeJwt('');
