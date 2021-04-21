import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core';
import { TestComplexType } from './TestComplexType';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters {
}
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterNoReturnType(parameters: TestActionImportNoParameterNoReturnTypeParameters): ActionImportRequestBuilder<TestActionImportNoParameterNoReturnTypeParameters, undefined>;
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
    nullableBooleanParam?: boolean;
    /**
     * Nullable Geography Point Param.
     */
    nullableGeographyPointParam?: any;
}
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportMultipleParameterComplexReturnType(parameters: TestActionImportMultipleParameterComplexReturnTypeParameters): ActionImportRequestBuilder<TestActionImportMultipleParameterComplexReturnTypeParameters, TestComplexType>;
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
export declare function testActionImportUnsupportedEdmTypes(parameters: TestActionImportUnsupportedEdmTypesParameters): ActionImportRequestBuilder<TestActionImportUnsupportedEdmTypesParameters, any>;
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterEntityReturnType]].
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters {
}
/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterEntityReturnType(parameters: TestActionImportNoParameterEntityReturnTypeParameters): ActionImportRequestBuilder<TestActionImportNoParameterEntityReturnTypeParameters, TestEntity>;
/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnType]].
 */
export interface TestActionImportSharedEntityReturnTypeParameters {
}
/**
 * Test Action Import Shared Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnType(parameters: TestActionImportSharedEntityReturnTypeParameters): Omit<ActionImportRequestBuilder<TestActionImportSharedEntityReturnTypeParameters, void>, 'execute'>;
/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnTypeCollection]].
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters {
}
/**
 * Test Action Import Shared Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnTypeCollection(parameters: TestActionImportSharedEntityReturnTypeCollectionParameters): Omit<ActionImportRequestBuilder<TestActionImportSharedEntityReturnTypeCollectionParameters, void>, 'execute'>;
export declare const actionImports: {
    testActionImportNoParameterNoReturnType: typeof testActionImportNoParameterNoReturnType;
    testActionImportMultipleParameterComplexReturnType: typeof testActionImportMultipleParameterComplexReturnType;
    testActionImportUnsupportedEdmTypes: typeof testActionImportUnsupportedEdmTypes;
    testActionImportNoParameterEntityReturnType: typeof testActionImportNoParameterEntityReturnType;
    testActionImportSharedEntityReturnType: typeof testActionImportSharedEntityReturnType;
    testActionImportSharedEntityReturnTypeCollection: typeof testActionImportSharedEntityReturnTypeCollection;
};
//# sourceMappingURL=action-imports.d.ts.map