/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnType}.
 */
export interface TestFunctionImportEdmReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  boolean
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnTypeCollection}.
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  string[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportNullableTest}.
 */
export interface TestFunctionImportNullableTestParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Nullable Per Default.
   */
  nullablePerDefault?: string | null;
  /**
   * Nullable Explicit.
   */
  nullableExplicit?: string | null;
  /**
   * Non Nullable.
   */
  nonNullable: string;
}
/**
 * Test Function Import Nullable Test.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportNullableTest<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportNullableTestParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportNullableTestParameters<DeSerializersT>,
  string[] | null
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType}.
 */
export interface TestFunctionImportEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnTypeCollection}.
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  TestEntity[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnType}.
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnTypeCollection}.
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnType}.
 */
export interface TestFunctionImportComplexReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnTypeCollection}.
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  TestComplexType[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportMultipleParams}.
 */
export interface TestFunctionImportMultipleParamsParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: string;
  /**
   * Non Nullable String Param.
   */
  nonNullableStringParam: string;
  /**
   * Nullable Boolean Param.
   */
  nullableBooleanParam?: boolean | null;
  /**
   * Nullable Geography Point Param.
   */
  nullableGeographyPointParam?: any | null;
}
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportMultipleParams<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  boolean | null
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportWithDifferentName}.
 */
export interface TestFunctionImportWithDifferentNameParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportWithDifferentName<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  undefined
>;
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterNoReturnType}.
 */
export interface TestActionImportNoParameterNoReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import No Parameter No Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterNoReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
  undefined
>;
/**
 * Type of the parameters to be passed to {@link testActionImportMultipleParameterComplexReturnType}.
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: string;
  /**
   * Non Nullable String Param.
   */
  nonNullableStringParam: string;
  /**
   * Nullable Boolean Param.
   */
  nullableBooleanParam?: boolean | null;
  /**
   * Nullable Geography Point Param.
   */
  nullableGeographyPointParam?: any | null;
}
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportMultipleParameterComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to {@link testActionImportUnsupportedEdmTypes}.
 */
export interface TestActionImportUnsupportedEdmTypesParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: any;
}
/**
 * Test Action Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportUnsupportedEdmTypes<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  any
>;
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterEntityReturnType}.
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import No Parameter Entity Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
>;
/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnType}.
 */
export interface TestActionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnTypeCollection}.
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testActionImportNullableTest}.
 */
export interface TestActionImportNullableTestParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Nullable Per Default.
   */
  nullablePerDefault?: string | null;
  /**
   * Nullable Explicit.
   */
  nullableExplicit?: string | null;
  /**
   * Non Nullable.
   */
  nonNullable: string;
}
/**
 * Test Action Import Nullable Test.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNullableTest<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNullableTestParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNullableTestParameters<DeSerializersT>,
  TestComplexType | null
>;
export declare const operations: {
  testFunctionImportEdmReturnType: typeof testFunctionImportEdmReturnType;
  testFunctionImportEdmReturnTypeCollection: typeof testFunctionImportEdmReturnTypeCollection;
  testFunctionImportNullableTest: typeof testFunctionImportNullableTest;
  testFunctionImportEntityReturnType: typeof testFunctionImportEntityReturnType;
  testFunctionImportEntityReturnTypeCollection: typeof testFunctionImportEntityReturnTypeCollection;
  testFunctionImportSharedEntityReturnType: typeof testFunctionImportSharedEntityReturnType;
  testFunctionImportSharedEntityReturnTypeCollection: typeof testFunctionImportSharedEntityReturnTypeCollection;
  testFunctionImportComplexReturnType: typeof testFunctionImportComplexReturnType;
  testFunctionImportComplexReturnTypeCollection: typeof testFunctionImportComplexReturnTypeCollection;
  testFunctionImportMultipleParams: typeof testFunctionImportMultipleParams;
  testFunctionImportWithDifferentName: typeof testFunctionImportWithDifferentName;
  testActionImportNoParameterNoReturnType: typeof testActionImportNoParameterNoReturnType;
  testActionImportMultipleParameterComplexReturnType: typeof testActionImportMultipleParameterComplexReturnType;
  testActionImportUnsupportedEdmTypes: typeof testActionImportUnsupportedEdmTypes;
  testActionImportNoParameterEntityReturnType: typeof testActionImportNoParameterEntityReturnType;
  testActionImportSharedEntityReturnType: typeof testActionImportSharedEntityReturnType;
  testActionImportSharedEntityReturnTypeCollection: typeof testActionImportSharedEntityReturnTypeCollection;
  testActionImportNullableTest: typeof testActionImportNullableTest;
};
