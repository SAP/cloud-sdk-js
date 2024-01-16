"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'KPIApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.KPIApi = {
    /**
     * Retrieve the number of executions, artifacts, and deployments
     * for each resource group, scenario, and executable. The columns to be returned can be specified in a query parameter.
     *
     * @param queryParameters - Object containing the following keys: $select.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kpiGet: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/analytics/kpis', {
        queryParameters
    })
};
//# sourceMappingURL=kpi-api.js.map