/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from './entity';
import { getRequestLine } from './odata-batch-request-builder';
import {
  content_transfer_encoding_line,
  part_content_type_line
} from './odate-batch-consts';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder
} from './request-builder';

/**
 * Build a string as the request body of the retrieve request.
 * Below is an example of the generated body, where the two empty line are mandatory to make the request valid.
 * *** example starts ***
 * Content-Type: application/http
 * Content-Transfer-Encoding: binary
 *
 * GET /SomeUrl/API_BUSINESS_PARTNER/A_BusinessPartnerBank?$format=json&$top=1 HTTP/1.1
 *
 *
 * *** example ends ***
 * @param requestBuilder - The request builder of the retrieve request.
 * @returns The request body.
 */
export function toBatchRetrieveBody(
  requestBuilder: GetAllRequestBuilder<Entity> | GetByKeyRequestBuilder<Entity>
): string {
  const lines: string[] = [
    part_content_type_line,
    content_transfer_encoding_line,
    '',
    getRequestLine(requestBuilder),
    '',
    ''
  ];
  return lines.join('\n');
}
