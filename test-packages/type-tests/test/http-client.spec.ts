import {
  executeHttpRequest, executeHttpRequestReturnDefaultResponse
} from '@sap-cloud-sdk/core';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });

// $ExpectType Promise<DefaultHttpResponse>
executeHttpRequestReturnDefaultResponse({ url: 'https://example.com' }, { method: 'get' });
