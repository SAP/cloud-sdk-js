/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { multiChangesetResponse, singleChangesetResponse } from './changeset-response';
import { errorChangesetResponse, errorRetrieveResponse } from './error-response';
import { getAllResponse, getByKeyResponse } from './retrieve-response';

export const multiRetrieveResponse = () =>
  ['--TEST-RESPONSE', ...getAllResponse, '--TEST-RESPONSE', ...getByKeyResponse, '--TEST-RESPONSE--'].join('\n');

export const multiChangesetBatchResponse = () =>
  ['--TEST-RESPONSE', ...singleChangesetResponse, '--TEST-RESPONSE', ...multiChangesetResponse, '--TEST-RESPONSE--'].join('\n');

export const mixedBatchResponse = () =>
  ['--TEST-RESPONSE', ...getAllResponse, '--TEST-RESPONSE', ...singleChangesetResponse, '--TEST-RESPONSE--'].join('\n');

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
  ].join('\n');
