import { FunctionImportRequestBuilderV2 } from '@sap-cloud-sdk/core';
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportNoReturnType(parameters: TestFunctionImportNoReturnTypeParameters): FunctionImportRequestBuilderV2<TestFunctionImportNoReturnTypeParameters, undefined>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {
}
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnType(parameters: TestFunctionImportEdmReturnTypeParameters): FunctionImportRequestBuilderV2<TestFunctionImportEdmReturnTypeParameters, boolean>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {
}
/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnTypeCollection(parameters: TestFunctionImportEdmReturnTypeCollectionParameters): FunctionImportRequestBuilderV2<TestFunctionImportEdmReturnTypeCollectionParameters, string[]>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters {
}
/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType(parameters: TestFunctionImportEntityReturnTypeParameters): FunctionImportRequestBuilderV2<TestFunctionImportEntityReturnTypeParameters, TestEntity>;
/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {
}
/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnTypeCollection(parameters: TestFunctionImportEntityReturnTypeCollectionParameters): FunctionImportRequestBuilderV2<TestFunctionImportEntityReturnTypeCollectionParameters, TestEntity[]>;
/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters {
}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnType(parameters: TestFunctionImportSharedEntityReturnTypeParameters): Omit<FunctionImportRequestBuilderV2<TestFunctionImportSharedEntityReturnTypeParameters, void>, 'execute'>;
/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnTypeCollection]].
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters {
}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnTypeCollection(parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters): Omit<FunctionImportRequestBuilderV2<TestFunctionImportSharedEntityReturnTypeCollectionParameters, void>, 'execute'>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {
}
/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnType(parameters: TestFunctionImportComplexReturnTypeParameters): FunctionImportRequestBuilderV2<TestFunctionImportComplexReturnTypeParameters, TestComplexType>;
/**
 * Type of the parameters to be passed to [[testFunctionImportUnsupportedEdmTypes]].
 */
export interface TestFunctionImportUnsupportedEdmTypesParameters {
    /**
     * Simple Param.
     */
    simpleParam: any;
}
/**
 * Test Function Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportUnsupportedEdmTypes(parameters: TestFunctionImportUnsupportedEdmTypesParameters): FunctionImportRequestBuilderV2<TestFunctionImportUnsupportedEdmTypesParameters, any>;
/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {
}
/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnTypeCollection(parameters: TestFunctionImportComplexReturnTypeCollectionParameters): FunctionImportRequestBuilderV2<TestFunctionImportComplexReturnTypeCollectionParameters, TestComplexType[]>;
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportGet(parameters: TestFunctionImportGetParameters): FunctionImportRequestBuilderV2<TestFunctionImportGetParameters, boolean>;
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportPost(parameters: TestFunctionImportPostParameters): FunctionImportRequestBuilderV2<TestFunctionImportPostParameters, boolean>;
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportMultipleParams(parameters: TestFunctionImportMultipleParamsParameters): FunctionImportRequestBuilderV2<TestFunctionImportMultipleParamsParameters, boolean>;
/**
 * Type of the parameters to be passed to [[createTestComplexType]].
 */
export interface CreateTestComplexTypeParameters {
}
/**
 * Create Test Complex Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestComplexType(parameters: CreateTestComplexTypeParameters): FunctionImportRequestBuilderV2<CreateTestComplexTypeParameters, TestComplexType>;
/**
 * Type of the parameters to be passed to [[fContinue]].
 */
export interface FContinueParameters {
}
/**
 * Continue.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function fContinue(parameters: FContinueParameters): FunctionImportRequestBuilderV2<FContinueParameters, boolean>;
export declare const functionImports: {
    testFunctionImportNoReturnType: typeof testFunctionImportNoReturnType;
    testFunctionImportEdmReturnType: typeof testFunctionImportEdmReturnType;
    testFunctionImportEdmReturnTypeCollection: typeof testFunctionImportEdmReturnTypeCollection;
    testFunctionImportEntityReturnType: typeof testFunctionImportEntityReturnType;
    testFunctionImportEntityReturnTypeCollection: typeof testFunctionImportEntityReturnTypeCollection;
    testFunctionImportSharedEntityReturnType: typeof testFunctionImportSharedEntityReturnType;
    testFunctionImportSharedEntityReturnTypeCollection: typeof testFunctionImportSharedEntityReturnTypeCollection;
    testFunctionImportComplexReturnType: typeof testFunctionImportComplexReturnType;
    testFunctionImportUnsupportedEdmTypes: typeof testFunctionImportUnsupportedEdmTypes;
    testFunctionImportComplexReturnTypeCollection: typeof testFunctionImportComplexReturnTypeCollection;
    testFunctionImportGet: typeof testFunctionImportGet;
    testFunctionImportPost: typeof testFunctionImportPost;
    testFunctionImportMultipleParams: typeof testFunctionImportMultipleParams;
    createTestComplexType: typeof createTestComplexType;
    fContinue: typeof fContinue;
};
//# sourceMappingURL=function-imports.d.ts.map