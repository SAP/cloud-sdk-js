"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerYamlServiceApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var api_1 = require("./openapi/api");
exports.SwaggerYamlServiceApi = {
    postEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'postEntity', args.pathParam, args.queryParam); },
    patchEntity: function (args) { return new core_1.OpenApiRequestBuilder(api_1.DefaultApi, 'patchEntity', args.pathParam, args.body); }
};
//# sourceMappingURL=api.js.map