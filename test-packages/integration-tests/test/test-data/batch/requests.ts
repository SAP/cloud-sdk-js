/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
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
  ].join('\n');

export const multiChangesetBatchRequest = () =>
  [
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*',
    ...multiChangesetRequest,
    '--batch_.*'
  ].join('\n');

export const mixedBatchRequest = () =>
  [
    '--batch_.*',
    ...getAllRequest,
    '--batch_.*',
    ...singleChangesetRequest,
    '--batch_.*--'
  ].join('\n');

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
  ].join('\n');
