import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core';
import { TestComplexType } from './TestComplexType';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters {}
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterNoReturnType(
  parameters: TestActionImportNoParameterNoReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterNoReturnTypeParameters,
  undefined
>;
/**
 * Type of the parameters to be passed to [[testActionImportMultipleParameterComplexReturnType]].
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters {
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
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportMultipleParameterComplexReturnType(
  parameters: TestActionImportMultipleParameterComplexReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportMultipleParameterComplexReturnTypeParameters,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to [[testActionImportUnsupportedEdmTypes]].
 */
export interface TestActionImportUnsupportedEdmTypesParameters {
  /**
   * Simple Param.
   */
  simpleParam: any;
}
/**
 * Test Action Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportUnsupportedEdmTypes(
  parameters: TestActionImportUnsupportedEdmTypesParameters
): ActionImportRequestBuilder<
  TestActionImportUnsupportedEdmTypesParameters,
  any
>;
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterEntityReturnType]].
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters {}
/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterEntityReturnType(
  parameters: TestActionImportNoParameterEntityReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterEntityReturnTypeParameters,
  TestEntity
>;
/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnType]].
 */
export interface TestActionImportSharedEntityReturnTypeParameters {}
/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnType(
  parameters: TestActionImportSharedEntityReturnTypeParameters
): Omit<
  ActionImportRequestBuilder<
    TestActionImportSharedEntityReturnTypeParameters,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnTypeCollection]].
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters {}
/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnTypeCollection(
  parameters: TestActionImportSharedEntityReturnTypeCollectionParameters
): Omit<
  ActionImportRequestBuilder<
    TestActionImportSharedEntityReturnTypeCollectionParameters,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to [[testActionImportNullableTest]].
 */
export interface TestActionImportNullableTestParameters {
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
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNullableTest(
  parameters: TestActionImportNullableTestParameters
): ActionImportRequestBuilder<
  TestActionImportNullableTestParameters,
  TestComplexType | null
>;
export declare const actionImports: {
  testActionImportNoParameterNoReturnType: typeof testActionImportNoParameterNoReturnType;
  testActionImportMultipleParameterComplexReturnType: typeof testActionImportMultipleParameterComplexReturnType;
  testActionImportUnsupportedEdmTypes: typeof testActionImportUnsupportedEdmTypes;
  testActionImportNoParameterEntityReturnType: typeof testActionImportNoParameterEntityReturnType;
  testActionImportSharedEntityReturnType: typeof testActionImportSharedEntityReturnType;
  testActionImportSharedEntityReturnTypeCollection: typeof testActionImportSharedEntityReturnTypeCollection;
  testActionImportNullableTest: typeof testActionImportNullableTest;
};
//# sourceMappingURL=action-imports.d.ts.map
