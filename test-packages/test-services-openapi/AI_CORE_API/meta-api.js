"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'MetaApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.MetaApi = {
    /**
     * Meta information about an implementation of AI API, describing its capabilities, limits and extensions
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    metaGet: () => new openapi_1.OpenApiRequestBuilder('get', '/lm/meta')
};
//# sourceMappingURL=meta-api.js.map