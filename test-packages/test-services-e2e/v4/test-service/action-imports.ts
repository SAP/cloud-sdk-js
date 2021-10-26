/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import '@sap-cloud-sdk/odata-common';
import {
  edmToTs,
  ActionImportRequestBuilder,
  ActionImportParameter,
  transformReturnValueForEntity,
  transformReturnValueForEdmType
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';

/**
 * Type of the parameters to be passed to [[createTestEntityById]].
 */
export interface CreateTestEntityByIdParameters {
  /**
   * Id.
   */
  id: number;
}

/**
 * Create Test Entity By Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestEntityById(
  parameters: CreateTestEntityByIdParameters
): ActionImportRequestBuilder<CreateTestEntityByIdParameters, TestEntity> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  };

  return new ActionImportRequestBuilder(
    '/odata/test-service',
    'createTestEntityById',
    data => transformReturnValueForEntity(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[createTestEntityByIdReturnId]].
 */
export interface CreateTestEntityByIdReturnIdParameters {
  /**
   * Id.
   */
  id: number;
}

/**
 * Create Test Entity By Id Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestEntityByIdReturnId(
  parameters: CreateTestEntityByIdReturnIdParameters
): ActionImportRequestBuilder<CreateTestEntityByIdReturnIdParameters, number> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  };

  return new ActionImportRequestBuilder(
    '/odata/test-service',
    'createTestEntityByIdReturnId',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Int32')
      ),
    params
  );
}

export const actionImports = {
  createTestEntityById,
  createTestEntityByIdReturnId
};
