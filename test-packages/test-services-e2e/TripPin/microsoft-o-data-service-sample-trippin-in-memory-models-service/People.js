'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.People = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class People extends odata_v4_1.Entity {
  constructor(_entityApi) {
    super(_entityApi);
    this._entityApi = _entityApi;
  }
  GetFavoriteAirline() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'Microsoft.OData.SampleService.Models.TripPin.GetFavoriteAirline',
      data => data,
      params,
      deSerializers
    );
  }
  GetInvolvedPeople() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'Microsoft.OData.SampleService.Models.TripPin.GetInvolvedPeople',
      data => data,
      params,
      deSerializers
    );
  }
  GetFriendsTrips(userName) {
    const params = {
      userName: new odata_v4_1.FunctionImportParameter(
        'userName',
        'Edm.String',
        userName
      )
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'Microsoft.OData.SampleService.Models.TripPin.GetFriendsTrips',
      data => data,
      params,
      deSerializers
    );
  }
  ShareTrip(userName, tripId) {
    const params = {
      userName: new odata_v4_1.ActionImportParameter(
        'userName',
        'Edm.String',
        userName
      ),
      tripId: new odata_v4_1.ActionImportParameter(
        'tripId',
        'Edm.Int32',
        tripId
      )
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
      'People',
      '',
      'MicrosoftODataServiceSampleTrippinInMemoryModelsService',
      'ShareTrip',
      data => data,
      params,
      deSerializers
    );
  }
}
exports.People = People;
/**
 * Technical entity name for People.
 */
People._entityName = 'People';
/**
 * Default url path for the according service.
 */
People._defaultServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
/**
 * All key fields of the People entity
 */
People._keys = ['UserName'];
//# sourceMappingURL=People.js.map
