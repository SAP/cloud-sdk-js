import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TaskDefinitionList } from './model';
export declare const TaskDefinitionsApi: {
    getV1TaskDefinitions: (queryParameters?: {
        $skip?: number | undefined;
        $top?: number | undefined;
        $inlinecount?: "none" | "allpages" | undefined;
        $expand?: "attributeDefinitions" | undefined;
    } | undefined) => OpenApiRequestBuilder<TaskDefinitionList>;
};
//# sourceMappingURL=task-definitions-api.d.ts.map