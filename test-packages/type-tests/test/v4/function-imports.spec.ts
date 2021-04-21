import { testFunctionImportSharedEntityReturnType } from '@sap-cloud-sdk/core/test/test-util/test-services/v4/test-service';

// $ExpectType Promise<HttpResponse>
testFunctionImportSharedEntityReturnType({}).executeRaw({
  url: 'somePath'
});

// $ExpectError
testFunctionImportSharedEntityReturnType({}).execute({
  url: 'somePath'
});
