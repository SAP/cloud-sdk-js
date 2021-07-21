import { FunctionImportRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity1 } from './TestEntity1';
import { TestEntity2 } from './TestEntity2';
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType1]].
 */
export interface TestFunctionImportEntityReturnType1Parameters {
}
/**
 * Test Function Import Entity Return Type 1.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType1(parameters: TestFunctionImportEntityReturnType1Parameters): FunctionImportRequestBuilderV4<TestFunctionImportEntityReturnType1Parameters, TestEntity1>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType2]].
 */
export interface TestFunctionImportEntityReturnType2Parameters {
}
/**
 * Test Function Import Entity Return Type 2.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType2(parameters: TestFunctionImportEntityReturnType2Parameters): FunctionImportRequestBuilderV4<TestFunctionImportEntityReturnType2Parameters, TestEntity2>;
export declare const functionImports: {
    testFunctionImportEntityReturnType1: typeof testFunctionImportEntityReturnType1;
    testFunctionImportEntityReturnType2: typeof testFunctionImportEntityReturnType2;
};
//# sourceMappingURL=function-imports.d.ts.map