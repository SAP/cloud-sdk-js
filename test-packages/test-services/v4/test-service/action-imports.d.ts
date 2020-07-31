import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core/v4';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters {
}
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
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
}
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testActionImportMultipleParameterComplexReturnType(parameters: TestActionImportMultipleParameterComplexReturnTypeParameters): ActionImportRequestBuilder<TestActionImportMultipleParameterComplexReturnTypeParameters, TestComplexType>;
export declare const actionImports: {
    testActionImportNoParameterNoReturnType: typeof testActionImportNoParameterNoReturnType;
    testActionImportMultipleParameterComplexReturnType: typeof testActionImportMultipleParameterComplexReturnType;
};
//# sourceMappingURL=action-imports.d.ts.map