import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

// $ExpectType Promise<HttpResponse>
executeHttpRequest({ url: 'https://example.com' }, { method: 'get' });
