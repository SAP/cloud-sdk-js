import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { FormMetadata, FormModel } from './model';
export declare const FormsApi: {
    getV1Forms: (queryParameters?: {
        $skip?: number | undefined;
        $top?: number | undefined;
        $inlinecount?: "none" | "allpages" | undefined;
        type?: "start" | "task" | undefined;
    } | undefined) => OpenApiRequestBuilder<FormMetadata[]>;
    deleteV1FormsByFormId: (formId: string) => OpenApiRequestBuilder<any>;
    getV1FormsRevisionsModelByFormIdAndRevisionId: (formId: string, revisionId: string) => OpenApiRequestBuilder<FormModel>;
    getV1FormsVersionsModelByFormIdAndVersionNumber: (formId: string, versionNumber: string) => OpenApiRequestBuilder<FormModel>;
};
//# sourceMappingURL=forms-api.d.ts.map