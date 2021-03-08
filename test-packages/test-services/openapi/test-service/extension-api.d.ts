import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { ExtensionApi } from './openapi/api';
export declare const TestServiceExtensionApi: {
    niceGetFunction: () => OpenApiRequestBuilder<ExtensionApi, "niceGetFunction">;
    nicePostFunction: () => OpenApiRequestBuilder<ExtensionApi, "nicePostFunction">;
    getTestCasesExtensionWithApiSuffix: () => OpenApiRequestBuilder<ExtensionApi, "getTestCasesExtensionWithApiSuffix">;
    getTestCasesExtensionWithSpaceApiSuffix: () => OpenApiRequestBuilder<ExtensionApi, "getTestCasesExtensionWithSpaceApiSuffix">;
    getTestCasesExtensionWithHyphenApiSuffix: () => OpenApiRequestBuilder<ExtensionApi, "getTestCasesExtensionWithHyphenApiSuffix">;
};
//# sourceMappingURL=extension-api.d.ts.map