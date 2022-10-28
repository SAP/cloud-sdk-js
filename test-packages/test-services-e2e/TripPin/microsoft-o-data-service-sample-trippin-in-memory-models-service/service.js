'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.microsoftODataServiceSampleTrippinInMemoryModelsService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PhotosApi_1 = require('./PhotosApi');
const PeopleApi_1 = require('./PeopleApi');
const AirlinesApi_1 = require('./AirlinesApi');
const AirportsApi_1 = require('./AirportsApi');
const function_imports_1 = require('./function-imports');
const action_imports_1 = require('./action-imports');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const BatchRequest_1 = require('./BatchRequest');
function microsoftODataServiceSampleTrippinInMemoryModelsService(
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  return new MicrosoftODataServiceSampleTrippinInMemoryModelsService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.microsoftODataServiceSampleTrippinInMemoryModelsService =
  microsoftODataServiceSampleTrippinInMemoryModelsService;
class MicrosoftODataServiceSampleTrippinInMemoryModelsService {
  constructor(deSerializers) {
    this.apis = {};
    this.deSerializers = deSerializers;
  }
  initApi(key, ctor) {
    if (!this.apis[key]) {
      this.apis[key] = new ctor(this.deSerializers);
    }
    return this.apis[key];
  }
  get photosApi() {
    return this.initApi('photosApi', PhotosApi_1.PhotosApi);
  }
  get peopleApi() {
    const api = this.initApi('peopleApi', PeopleApi_1.PeopleApi);
    const linkedApis = [
      this.initApi('peopleApi', PeopleApi_1.PeopleApi),
      this.initApi('photosApi', PhotosApi_1.PhotosApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get airlinesApi() {
    return this.initApi('airlinesApi', AirlinesApi_1.AirlinesApi);
  }
  get airportsApi() {
    return this.initApi('airportsApi', AirportsApi_1.AirportsApi);
  }
  get functionImports() {
    return {
      getNearestAirport: parameter =>
        (0, function_imports_1.getNearestAirport)(parameter, this.deSerializers)
    };
  }
  get actionImports() {
    return {
      resetDataSource: parameter =>
        (0, action_imports_1.resetDataSource)(parameter, this.deSerializers)
    };
  }
  get batch() {
    return BatchRequest_1.batch;
  }
  get changeset() {
    return BatchRequest_1.changeset;
  }
}
//# sourceMappingURL=service.js.map
