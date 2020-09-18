/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { testEntityKeyPropGuid, testEntityKeyPropString } from '../keys';
import { requestHeader } from './header';

export const getAllRequest = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary',
  '',
  'GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\?\\$format=json HTTP/1\\.1',
  ...requestHeader(),
  ''
];

export const getByKeyRequest = [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary',
  '',
  `GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\(KeyPropertyGuid=guid'\\${testEntityKeyPropGuid}',KeyPropertyString='\\${testEntityKeyPropString}'\\)\\?\\$format=json HTTP/1\\.1`,
  ...requestHeader(),
  ''
];
