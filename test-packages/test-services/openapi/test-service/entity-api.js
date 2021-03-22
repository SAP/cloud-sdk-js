"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.EntityApi = {
    getAllEntities: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/entities', {
        queryParameters: queryParameters
    }); },
    updateEntityWithPut: function (body) { return new core_1.OpenApiRequestBuilder('put', '/entities', {
        body: body
    }); },
    createEntity: function (body) { return new core_1.OpenApiRequestBuilder('post', '/entities', {
        body: body
    }); },
    updateEntity: function (body) { return new core_1.OpenApiRequestBuilder('patch', '/entities', {
        body: body
    }); },
    deleteEntity: function (body) { return new core_1.OpenApiRequestBuilder('delete', '/entities', {
        body: body
    }); },
    getEntityByKey: function (entityId) { return new core_1.OpenApiRequestBuilder('get', "/entities/" + entityId); },
    countEntities: function () { return new core_1.OpenApiRequestBuilder('get', '/entities/count'); }
};
//# sourceMappingURL=entity-api.js.map