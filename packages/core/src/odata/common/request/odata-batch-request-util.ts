/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MethodRequestBuilderBase } from '../request-builder';
import { http_version } from '../odate-batch-consts';
import { ODataRequestConfig } from './odata-request-config';

function getUrl(requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>) {
  return `/${requestBuilder.relativeUrl()}`;
}

function getMethod(
  requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>
) {
  return requestBuilder.requestConfig.method;
}

/**
 * Generate the request line, containing method, url and http version from the request builder, e.g.:
 * GET /sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress?$format=json&$top=1 HTTP/1.1
 * @param requestBuilder - Reqeust builder holds the request information.
 * @returns the generated request line.
 */
export function getRequestLine(
  requestBuilder: MethodRequestBuilderBase<ODataRequestConfig>
): string {
  return `${getMethod(requestBuilder).toUpperCase()} ${getUrl(
    requestBuilder
  )} ${http_version}`;
}
