"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.MessagesApi = {
    createV1Messages: function (body) { return new core_1.OpenApiRequestBuilder('post', '/v1/messages/', {
        body: body
    }); }
};
//# sourceMappingURL=messages-api.js.map