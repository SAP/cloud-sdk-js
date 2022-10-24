/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { edmToTs, FunctionImportRequestBuilder, DeSerializers, transformReturnValueForEdmType, transformReturnValueForEntityList, transformReturnValueForEntity, transformReturnValueForEdmTypeList, DefaultDeSerializers, defaultDeSerializers, FunctionImportParameter } from '@sap-cloud-sdk/odata-v4';
import { testService } from './service';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';
import { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';

/**
 * Type of the parameters to be passed to {@link concatStrings}.
 */
export interface ConcatStringsParameters<DeSerializersT extends DeSerializers> {
  /**
   * Str 1.
   */
  str1: string;
  /**
   * Str 2.
   */
  str2: string;
}

/**
 * Concat Strings. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ConcatStringsParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, ConcatStringsParameters<DeSerializersT>, string> {
  const params = {
    str1: new FunctionImportParameter('Str1', 'Edm.String', parameters.str1),
    str2: new FunctionImportParameter('Str2', 'Edm.String', parameters.str2)
  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'concatStrings', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val.value, 'Edm.String', deSerializers)), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link getAll}.
 */
export interface GetAllParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Get All. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getAll<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetAllParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, GetAllParameters<DeSerializersT>, TestEntity[]> {
  const params = {

  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'getAll', (data) => transformReturnValueForEntityList(data, testService(deSerializers).testEntityApi), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link getByKey}.
 */
export interface GetByKeyParameters<DeSerializersT extends DeSerializers> {
  /**
   * Param.
   */
  param: number;
}

/**
 * Get By Key. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetByKeyParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, GetByKeyParameters<DeSerializersT>, TestEntity> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'getByKey', (data) => transformReturnValueForEntity(data, testService(deSerializers).testEntityApi), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link getByKeyWithMultipleKeys}.
 */
export interface GetByKeyWithMultipleKeysParameters<DeSerializersT extends DeSerializers> {
  /**
   * Key Test Entity With Multiple Keys.
   */
  keyTestEntityWithMultipleKeys: number;
  /**
   * String Property With Multiple Keys.
   */
  stringPropertyWithMultipleKeys: string;
  /**
   * Boolean Property With Multiple Keys.
   */
  booleanPropertyWithMultipleKeys: boolean;
}

/**
 * Get By Key With Multiple Keys. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getByKeyWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetByKeyWithMultipleKeysParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, GetByKeyWithMultipleKeysParameters<DeSerializersT>, TestEntityWithMultipleKeys> {
  const params = {
    keyTestEntityWithMultipleKeys: new FunctionImportParameter('KeyTestEntityWithMultipleKeys', 'Edm.Int32', parameters.keyTestEntityWithMultipleKeys),
    stringPropertyWithMultipleKeys: new FunctionImportParameter('StringPropertyWithMultipleKeys', 'Edm.String', parameters.stringPropertyWithMultipleKeys),
    booleanPropertyWithMultipleKeys: new FunctionImportParameter('BooleanPropertyWithMultipleKeys', 'Edm.Boolean', parameters.booleanPropertyWithMultipleKeys)
  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'getByKeyWithMultipleKeys', (data) => transformReturnValueForEntity(data, testService(deSerializers).testEntityWithMultipleKeysApi), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link returnCollection}.
 */
export interface ReturnCollectionParameters<DeSerializersT extends DeSerializers> {
  /**
   * Param.
   */
  param: number;
}

/**
 * Return Collection. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnCollectionParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, ReturnCollectionParameters<DeSerializersT>, number[]> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'returnCollection', (data) => transformReturnValueForEdmTypeList(data, (val) => edmToTs(val, 'Edm.Int32', deSerializers)), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link returnInt}.
 */
export interface ReturnIntParameters<DeSerializersT extends DeSerializers> {
  /**
   * Param.
   */
  param: number;
}

/**
 * Return Int. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnIntParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, ReturnIntParameters<DeSerializersT>, number> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'returnInt', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val.value, 'Edm.Int32', deSerializers)), params, deSerializers);
}

/**
 * Type of the parameters to be passed to {@link returnSapCloudSdk}.
 */
export interface ReturnSapCloudSdkParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Return Sap Cloud Sdk. 
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnSapCloudSdk<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnSapCloudSdkParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): FunctionImportRequestBuilder<DeSerializersT, ReturnSapCloudSdkParameters<DeSerializersT>, string> {
  const params = {

  };


  return new FunctionImportRequestBuilder('/odata/test-service', 'returnSapCloudSdk', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val.value, 'Edm.String', deSerializers)), params, deSerializers);
}

export const functionImports = {
  concatStrings,
  getAll,
  getByKey,
  getByKeyWithMultipleKeys,
  returnCollection,
  returnInt,
  returnSapCloudSdk
};
