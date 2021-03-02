import {
  executeHttpRequest,
  executeHttpRequestReturnRequestAndResponse
} from '@sap-cloud-sdk/core';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });

// $ExpectType Promise<HttpRequestAndResponse>
executeHttpRequestReturnRequestAndResponse({ url: 'https://example.com' }, { method: 'get' });
