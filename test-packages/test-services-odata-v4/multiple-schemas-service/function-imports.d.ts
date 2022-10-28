import { FunctionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEntity1 } from './TestEntity1';
import { TestEntity2 } from './TestEntity2';
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType1}.
 */
export interface TestFunctionImportEntityReturnType1Parameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType1<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEntityReturnType1Parameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEntityReturnType1Parameters<DeSerializersT>, TestEntity1>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType2}.
 */
export interface TestFunctionImportEntityReturnType2Parameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEntityReturnType2Parameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEntityReturnType2Parameters<DeSerializersT>, TestEntity2>;
export declare const functionImports: {
    testFunctionImportEntityReturnType1: typeof testFunctionImportEntityReturnType1;
    testFunctionImportEntityReturnType2: typeof testFunctionImportEntityReturnType2;
};
//# sourceMappingURL=function-imports.d.ts.map