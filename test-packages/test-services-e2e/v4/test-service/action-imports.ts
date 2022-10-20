/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { edmToTs, ActionImportRequestBuilder, ActionImportParameter, transformReturnValueForEntity, transformReturnValueForEdmType, DeSerializers, DefaultDeSerializers, defaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { testService } from './service';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';

/**
 * Type of the parameters to be passed to {@link createTestEntityById_4}.
 */
export interface CreateTestEntityById4Parameters<DeSerializersT extends DeSerializers> {
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
export function createTestEntityById_4<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: CreateTestEntityById4Parameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, CreateTestEntityById4Parameters<DeSerializersT>, TestEntity> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  }

  return new ActionImportRequestBuilder('/odata/test-service', 'createTestEntityById', (data) => transformReturnValueForEntity(data, testService(deSerializers).testEntityApi), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link createTestEntityByIdReturnId_4}.
 */
export interface CreateTestEntityByIdReturnId4Parameters<DeSerializersT extends DeSerializers> {
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
export function createTestEntityByIdReturnId_4<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: CreateTestEntityByIdReturnId4Parameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, CreateTestEntityByIdReturnId4Parameters<DeSerializersT>, number> {
  const params = {
    id: new ActionImportParameter('id', 'Edm.Int32', parameters.id)
  }

  return new ActionImportRequestBuilder('/odata/test-service', 'createTestEntityByIdReturnId', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val.value, 'Edm.Int32', deSerializers)), params, deSerializers);
}

export const actionImports = {
  createTestEntityById_4,
  createTestEntityByIdReturnId_4
};
