import { executeHttpRequest, executeRawHttpRequest } from '@sap-cloud-sdk/core';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });

// $ExpectType Promise<HttpRequestAndResponse>
executeRawHttpRequest({ url: 'https://example.com' }, { method: 'get' });
