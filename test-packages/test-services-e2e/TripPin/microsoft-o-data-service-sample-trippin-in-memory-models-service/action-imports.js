'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.actionImports = exports.resetDataSource = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function resetDataSource(parameters) {
  const params = {};
  return new core_1.ActionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'ResetDataSource',
    data =>
      (0, core_1.transformReturnValueForUndefinedV4)(data, val => undefined),
    params
  );
}
exports.resetDataSource = resetDataSource;
exports.actionImports = {
  resetDataSource
};
//# sourceMappingURL=action-imports.js.map
