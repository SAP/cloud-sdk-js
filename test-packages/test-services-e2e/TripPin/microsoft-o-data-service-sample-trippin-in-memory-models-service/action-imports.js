'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.actionImports = exports.resetDataSource = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function resetDataSource(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.ActionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'ResetDataSource',
    data =>
      (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined),
    params,
    deSerializers
  );
}
exports.resetDataSource = resetDataSource;
exports.actionImports = {
  resetDataSource
};
//# sourceMappingURL=action-imports.js.map
