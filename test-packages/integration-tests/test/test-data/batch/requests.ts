import { webEOL } from '@sap-cloud-sdk/util';
import {
  multiChangesetRequest,
  singleChangesetRequest,
  singleChangesetRequestWithCustomUrl
} from './changeset-request';
import { getAllRequest, getByKeyRequest } from './retrieve-request';

export const multiRetrieveRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...getByKeyRequest,
    '--batch_.*--'
  ].join(webEOL);

export const multiChangesetBatchRequest = () =>
  [
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*',
    ...multiChangesetRequest,
    '--batch_.*',
    ...singleChangesetRequestWithCustomUrl,
    '--batch_.*'
  ].join(webEOL);

export const mixedBatchRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*--'
  ].join(webEOL);

export const mixedErrorRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*--',
    ''
  ].join(webEOL);
