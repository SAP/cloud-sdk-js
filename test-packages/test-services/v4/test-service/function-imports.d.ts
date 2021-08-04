import { FunctionImportRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {}
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnType(
  parameters: TestFunctionImportEdmReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEdmReturnTypeParameters,
  boolean
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {}
/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnTypeCollection(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEdmReturnTypeCollectionParameters,
  string[]
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportNullableTest]].
 */
export interface TestFunctionImportNullableTestParameters {
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportNullableTest(
  parameters: TestFunctionImportNullableTestParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportNullableTestParameters,
  string[] | null
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters {}
/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType(
  parameters: TestFunctionImportEntityReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEntityReturnTypeParameters,
  TestEntity
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {}
/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnTypeCollection(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestEntity[]
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters {}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnType(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters
): Omit<
  FunctionImportRequestBuilderV4<
    TestFunctionImportSharedEntityReturnTypeParameters,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnTypeCollection]].
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters {}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnTypeCollection(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters
): Omit<
  FunctionImportRequestBuilderV4<
    TestFunctionImportSharedEntityReturnTypeCollectionParameters,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {}
/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnType(
  parameters: TestFunctionImportComplexReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportComplexReturnTypeParameters,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {}
/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnTypeCollection(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestComplexType[]
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportMultipleParams]].
 */
export interface TestFunctionImportMultipleParamsParameters {
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportMultipleParams(
  parameters: TestFunctionImportMultipleParamsParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportMultipleParamsParameters,
  boolean | null
>;
/**
 * Type of the parameters to be passed to [[testFunctionImportWithDifferentName]].
 */
export interface TestFunctionImportWithDifferentNameParameters {}
/**
 * Test Function Import With Different Name.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportWithDifferentName(
  parameters: TestFunctionImportWithDifferentNameParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportWithDifferentNameParameters,
  undefined
>;
export declare const functionImports: {
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
};
//# sourceMappingURL=function-imports.d.ts.map
