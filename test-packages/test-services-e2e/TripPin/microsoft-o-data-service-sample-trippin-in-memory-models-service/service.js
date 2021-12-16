'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MicrosoftODataServiceSampleTrippinInMemoryModelsService =
  exports.builder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PhotosApi_1 = require('./PhotosApi');
const PeopleApi_1 = require('./PeopleApi');
const AirlinesApi_1 = require('./AirlinesApi');
const AirportsApi_1 = require('./AirportsApi');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
function builder(deSerializers = odata_v4_1.defaultDeSerializers) {
  return new MicrosoftODataServiceSampleTrippinInMemoryModelsService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.builder = builder;
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
    const api = this.initApi('photosApi', PhotosApi_1.PhotosApi);
    return api;
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
    const api = this.initApi('airlinesApi', AirlinesApi_1.AirlinesApi);
    return api;
  }
  get airportsApi() {
    const api = this.initApi('airportsApi', AirportsApi_1.AirportsApi);
    return api;
  }
}
exports.MicrosoftODataServiceSampleTrippinInMemoryModelsService =
  MicrosoftODataServiceSampleTrippinInMemoryModelsService;
//# sourceMappingURL=service.js.map
