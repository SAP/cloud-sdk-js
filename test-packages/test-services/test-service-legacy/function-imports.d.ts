import { FunctionImportRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to [[testFunctionImportNoReturnType]].
 */
export interface TestFunctionImportNoReturnTypeParameters {
}
/**
 * Test Function Import No Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportNoReturnType(parameters: TestFunctionImportNoReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportNoReturnTypeParameters, undefined>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {
}
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportEdmReturnType(parameters: TestFunctionImportEdmReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeParameters, boolean>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {
}
/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportEdmReturnTypeCollection(parameters: TestFunctionImportEdmReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeCollectionParameters, string[]>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters {
}
/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportEntityReturnType(parameters: TestFunctionImportEntityReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeParameters, TestEntity>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {
}
/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportEntityReturnTypeCollection(parameters: TestFunctionImportEntityReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeCollectionParameters, TestEntity[]>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {
}
/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportComplexReturnType(parameters: TestFunctionImportComplexReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeParameters, TestComplexType>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {
}
/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportComplexReturnTypeCollection(parameters: TestFunctionImportComplexReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeCollectionParameters, TestComplexType[]>;
/**
 * Type of the parameters to be passed to [[testFunctionImportGet]].
 */
export interface TestFunctionImportGetParameters {
    /**
     * Simple Param.
     */
    simpleParam: string;
}
/**
 * Test Function Import Get.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportGet(parameters: TestFunctionImportGetParameters): FunctionImportRequestBuilder<TestFunctionImportGetParameters, boolean>;
/**
 * Type of the parameters to be passed to [[testFunctionImportPost]].
 */
export interface TestFunctionImportPostParameters {
    /**
     * Simple Param.
     */
    simpleParam: string;
}
/**
 * Test Function Import Post.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportPost(parameters: TestFunctionImportPostParameters): FunctionImportRequestBuilder<TestFunctionImportPostParameters, boolean>;
/**
 * Type of the parameters to be passed to [[testFunctionImportMultipleParams]].
 */
export interface TestFunctionImportMultipleParamsParameters {
    /**
     * String Param.
     */
    stringParam: string;
    /**
     * Boolean Param.
     */
    booleanParam: boolean;
}
/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function testFunctionImportMultipleParams(parameters: TestFunctionImportMultipleParamsParameters): FunctionImportRequestBuilder<TestFunctionImportMultipleParamsParameters, boolean>;
/**
 * Type of the parameters to be passed to [[createTestComplexType]].
 */
export interface CreateTestComplexTypeParameters {
}
/**
 * Create Test Complex Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function createTestComplexType(parameters: CreateTestComplexTypeParameters): FunctionImportRequestBuilder<CreateTestComplexTypeParameters, TestComplexType>;
/**
 * Type of the parameters to be passed to [[fContinue]].
 */
export interface FContinueParameters {
}
/**
 * Continue.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function fContinue(parameters: FContinueParameters): FunctionImportRequestBuilder<FContinueParameters, boolean>;
export declare const functionImports: {
    testFunctionImportNoReturnType: typeof testFunctionImportNoReturnType;
    testFunctionImportEdmReturnType: typeof testFunctionImportEdmReturnType;
    testFunctionImportEdmReturnTypeCollection: typeof testFunctionImportEdmReturnTypeCollection;
    testFunctionImportEntityReturnType: typeof testFunctionImportEntityReturnType;
    testFunctionImportEntityReturnTypeCollection: typeof testFunctionImportEntityReturnTypeCollection;
    testFunctionImportComplexReturnType: typeof testFunctionImportComplexReturnType;
    testFunctionImportComplexReturnTypeCollection: typeof testFunctionImportComplexReturnTypeCollection;
    testFunctionImportGet: typeof testFunctionImportGet;
    testFunctionImportPost: typeof testFunctionImportPost;
    testFunctionImportMultipleParams: typeof testFunctionImportMultipleParams;
    createTestComplexType: typeof createTestComplexType;
    fContinue: typeof fContinue;
};
//# sourceMappingURL=function-imports.d.ts.map