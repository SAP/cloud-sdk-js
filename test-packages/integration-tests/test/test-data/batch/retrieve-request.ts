import { testEntityKeyPropGuid, testEntityKeyPropString } from '../keys';
import { requestHeader } from './header';

export const getAllRequest = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary',
  '',
  'GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity HTTP/1\\.1',
  ...requestHeader(),
  '',
  ''
];

export const getByKeyRequest = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary',
  '',
  `GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\(KeyPropertyGuid=guid'\\${testEntityKeyPropGuid}',KeyPropertyString='\\${testEntityKeyPropString}'\\) HTTP/1\\.1`,
  ...requestHeader(),
  '',
  ''
];
