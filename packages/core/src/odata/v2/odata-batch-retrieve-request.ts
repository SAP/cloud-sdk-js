import {
  part_content_type_line,
  content_transfer_encoding_line
} from '../common';
import { getRequestLine } from '../common/request/odata-batch-request-util';
import { EntityV2 } from './entity';
import {
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2
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
export function toBatchRetrieveBodyV2(
  requestBuilder:
    | GetAllRequestBuilderV2<EntityV2>
    | GetByKeyRequestBuilderV2<EntityV2>
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

export { toBatchRetrieveBodyV2 as toBatchRetrieveBody };
