"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDefinitionsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.WorkflowDefinitionsApi = {
    getV1WorkflowDefinitions: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/workflow-definitions', {
        queryParameters: queryParameters
    }); },
    getV1WorkflowDefinitionsByDefinitionId: function (definitionId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId); },
    deleteV1WorkflowDefinitionsByDefinitionId: function (definitionId, queryParameters) { return new core_1.OpenApiRequestBuilder('delete', "/v1/workflow-definitions/" + definitionId, {
        queryParameters: queryParameters
    }); },
    getV1WorkflowDefinitionsVersionsByDefinitionId: function (definitionId, queryParameters) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/versions", {
        queryParameters: queryParameters
    }); },
    getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber: function (definitionId, versionNumber) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/versions/" + versionNumber); },
    getV1WorkflowDefinitionsModelByDefinitionId: function (definitionId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/model"); },
    getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber: function (definitionId, versionNumber) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/versions/" + versionNumber + "/model"); },
    getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId: function (definitionId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/sample-contexts/default-start-context"); },
    getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber: function (definitionId, versionNumber) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-definitions/" + definitionId + "/versions/" + versionNumber + "/sample-contexts/default-start-context"); }
};
//# sourceMappingURL=workflow-definitions-api.js.map