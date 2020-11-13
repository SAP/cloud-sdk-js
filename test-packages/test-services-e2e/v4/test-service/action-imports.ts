/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEntityV4, transformReturnValueForEdmTypeV4, edmToTsV4, ActionImportRequestBuilder, ActionImportParameter } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';

/**
 * Type of the parameters to be passed to [[createTestEntity]].
 */
export interface CreateTestEntityParameters {
  /**
   * Id.
   */
  id: number;
}

/**
 * Create Test Entity.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestEntity(parameters: CreateTestEntityParameters): ActionImportRequestBuilder<CreateTestEntityParameters, TestEntity> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  }

  return new ActionImportRequestBuilder('/test-service', 'createTestEntity', (data) => transformReturnValueForEntityV4(data, TestEntity), params);
}

/**
 * Type of the parameters to be passed to [[createTestEntityReturnId]].
 */
export interface CreateTestEntityReturnIdParameters {
  /**
   * Id.
   */
  id: number;
}

/**
 * Create Test Entity Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestEntityReturnId(parameters: CreateTestEntityReturnIdParameters): ActionImportRequestBuilder<CreateTestEntityReturnIdParameters, number> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  }

  return new ActionImportRequestBuilder('/test-service', 'createTestEntityReturnId', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.Int32')), params);
}

export const actionImports = {
  createTestEntity,
  createTestEntityReturnId
};
