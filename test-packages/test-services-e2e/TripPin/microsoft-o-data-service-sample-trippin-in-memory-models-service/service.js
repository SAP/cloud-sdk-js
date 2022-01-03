'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MicrosoftODataServiceSampleTrippinInMemoryModelsService =
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
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
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
}
exports.MicrosoftODataServiceSampleTrippinInMemoryModelsService =
  MicrosoftODataServiceSampleTrippinInMemoryModelsService;
//# sourceMappingURL=service.js.map
