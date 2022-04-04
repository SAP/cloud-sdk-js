import { unixEOL } from '@sap-cloud-sdk/util';

export const header200 = () =>
  [
    'HTTP/1.1 200 OK',
    'Content-Type: application/json',
    'Content-Length: 2626',
    'dataserviceversion: 2.0',
    'sap-metadata-last-modified: Thu, 08 Aug 2019 09:56:58 GMT',
    'cache-control: no-store, no-cache'
  ].join(unixEOL);

export const header201 = () => [
  'Content-Type: application/http',
  'Content-Length: 1',
  'content-transfer-encoding: binary',
  '',
  'HTTP/1.1 201 Created',
  'Content-Type: application/json',
  'Content-Length: 1'
];

export const header204 = () => [
  'Content-Type: application/http',
  'Content-Length: 1',
  'content-transfer-encoding: binary',
  '',
  'HTTP/1.1 204 No Content',
  'Content-Length: 0',
  'dataserviceversion: 2.0'
];

export const header404 = () => [
  'HTTP/1.1 404 Not Found',
  'Content-Type: application/json;charset=utf-8',
  'Content-Length: 1',
  'dataserviceversion: 1.0',
  'sap-cache-control: -u'
];

export const header400 = () => [
  'HTTP/1.1 400 Bad Request',
  'Content-Type: application/json;charset=utf-8',
  'Content-Length: 1',
  'dataserviceversion: 1.0'
];

export const retrieveHeader = () => [
  'Content-Type: application/http',
  'Content-Length: 1',
  'content-transfer-encoding: binary'
];

export const changesetHeader = () => [
  'Content-Type: application/http',
  'Content-Transfer-Encoding: binary',
  'Content-Id: .*'
];

export const requestHeader = () => [
  'Content-Type: application/json',
  'Accept: application/json'
];
