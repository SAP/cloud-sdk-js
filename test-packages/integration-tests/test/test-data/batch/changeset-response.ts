import {
  testEntityKeyPropGuid,
  testEntityKeyPropString,
  testEntityMultiLinkKeyProp
} from '../keys';
import { singleTestEntityMultiLinkResponse } from '../single-test-entity-multi-link-response';
import { singleTestEntityResponse } from '../single-test-entity-response';
import { header201, header204 } from './header';

const createResponse = [
  ...header201(),
  `location: https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
  'dataserviceversion: 2.0',
  '',
  JSON.stringify(singleTestEntityResponse())
];

const createAsChildOfResponse = [
  ...header201(),
  `location: https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyProperty='${testEntityMultiLinkKeyProp}')`,
  'dataserviceversion: 2.0',
  '',
  JSON.stringify(singleTestEntityMultiLinkResponse())
];

const noContentResponse = [...header204(), '', ''];

export const singleChangesetResponse = [
  'Content-Type: multipart/mixed; boundary=TEST-SUB-RESPONSE',
  'Content-Length: 1',
  '',
  '--TEST-SUB-RESPONSE',
  ...createAsChildOfResponse,
  '--TEST-SUB-RESPONSE--',
  ''
];

export const multiChangesetResponse = [
  'Content-Type: multipart/mixed; boundary=TEST-SUB-RESPONSE',
  'Content-Length: 1',
  '',
  '--TEST-SUB-RESPONSE',
  ...createResponse,
  '--TEST-SUB-RESPONSE',
  ...noContentResponse,
  '--TEST-SUB-RESPONSE',
  ...noContentResponse,
  '--TEST-SUB-RESPONSE--',
  ...noContentResponse,
  '--TEST-SUB-RESPONSE--',
  ''
];
