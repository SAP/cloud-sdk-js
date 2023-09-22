"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airports = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class Airports extends odata_v4_1.Entity {
    /**
     * Technical entity name for Airports.
     */
    static _entityName = 'Airports';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
    /**
     * All key fields of the Airports entity
     */
    static _keys = ['IcaoCode'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.Airports = Airports;
//# sourceMappingURL=Airports.js.map