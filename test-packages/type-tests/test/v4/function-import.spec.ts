import { testFunctionImportNullableTest } from '@sap-cloud-sdk/test-services/v4/test-service';
import {FunctionImportRequestBuilderV4} from "@sap-cloud-sdk/core";

// $ExpectError
testFunctionImportNullableTest({});

// $ExpectType FunctionImportRequestBuilderV4
testFunctionImportNullableTest({
  nullableExplicit: null,
  nullablePerDefault: null,
  nonNullable: ''
});

// $ExpectType FunctionImportRequestBuilderV4
testFunctionImportNullableTest({
  nonNullable: ''
});

// $ExpectType Promise<string[] | null>
const result = testFunctionImportNullableTest({
  nonNullable: 'someValue'
}).execute({ url: 'someURL' });
