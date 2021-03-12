import {
  executeHttpRequest
} from '@sap-cloud-sdk/core';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });
