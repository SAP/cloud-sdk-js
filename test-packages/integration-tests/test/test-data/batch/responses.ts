import { unixEOL } from '@sap-cloud-sdk/util';
import {
  multiChangesetResponse,
  singleChangesetResponse
} from './changeset-response';
import {
  errorChangesetResponse,
  errorRetrieveResponse
} from './error-response';
import { getAllResponse, getByKeyResponse } from './retrieve-response';

export const multiRetrieveResponse = () =>
  [
    '--TEST-RESPONSE',
    ...getAllResponse,
    '--TEST-RESPONSE',
    ...getByKeyResponse,
    '--TEST-RESPONSE--'
  ].join(unixEOL);

export const multiChangesetBatchResponse = () =>
  [
    '--TEST-RESPONSE',
    ...singleChangesetResponse,
    '--TEST-RESPONSE',
    ...multiChangesetResponse,
    '--TEST-RESPONSE--'
  ].join(unixEOL);

export const mixedBatchResponse = () =>
  [
    '--TEST-RESPONSE',
    ...getAllResponse,
    '--TEST-RESPONSE',
    ...singleChangesetResponse,
    '--TEST-RESPONSE--'
  ].join(unixEOL);

export const mixedErrorResponse = () =>
  [
    '--TEST-RESPONSE',
    ...getAllResponse,
    '--TEST-RESPONSE',
    ...errorRetrieveResponse,
    '--TEST-RESPONSE',
    ...singleChangesetResponse,
    '--TEST-RESPONSE',
    ...errorChangesetResponse,
    '--TEST-RESPONSE--'
  ].join(unixEOL);
