import { EOL } from 'os';
import {
  multiChangesetRequest,
  singleChangesetRequest
} from './changeset-request';
import { getAllRequest, getByKeyRequest } from './retrieve-request';

export const multiRetrieveRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...getByKeyRequest,
    '--batch_.*--'
  ].join(EOL);

export const multiChangesetBatchRequest = () =>
  [
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*',
    ...multiChangesetRequest,
    '--batch_.*'
  ].join(EOL);

export const mixedBatchRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*--'
  ].join(EOL);

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
  ].join(EOL);
