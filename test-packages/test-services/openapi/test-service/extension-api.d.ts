import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { ExtensionApi } from './openapi/api';
export declare const TestServiceExtensionApi: {
    niceGetFunction: () => OpenApiRequestBuilder<ExtensionApi, "getTestCasesExtension">;
    testCasesExtensionPost: () => OpenApiRequestBuilder<ExtensionApi, "testCasesExtensionPost">;
};
//# sourceMappingURL=extension-api.d.ts.map