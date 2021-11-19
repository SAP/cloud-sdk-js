import '@sap-cloud-sdk/odata-common/internal';
import { ActionImportRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestComplexType1 } from './TestComplexType1';
import { TestComplexType2 } from './TestComplexType2';
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterComplexReturnType1]].
 */
export interface TestActionImportNoParameterComplexReturnType1Parameters {}
/**
 * Test Action Import No Parameter Complex Return Type 1.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterComplexReturnType1(
  parameters: TestActionImportNoParameterComplexReturnType1Parameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterComplexReturnType1Parameters,
  TestComplexType1
>;
/**
 * Type of the parameters to be passed to [[testActionImportNoParameterComplexReturnType2]].
 */
export interface TestActionImportNoParameterComplexReturnType2Parameters {}
/**
 * Test Action Import No Parameter Complex Return Type 2.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterComplexReturnType2(
  parameters: TestActionImportNoParameterComplexReturnType2Parameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterComplexReturnType2Parameters,
  TestComplexType2
>;
export declare const actionImports: {
  testActionImportNoParameterComplexReturnType1: typeof testActionImportNoParameterComplexReturnType1;
  testActionImportNoParameterComplexReturnType2: typeof testActionImportNoParameterComplexReturnType2;
};
//# sourceMappingURL=action-imports.d.ts.map
