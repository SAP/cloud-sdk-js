import { FunctionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnType}.
 */
export interface TestFunctionImportEdmReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEdmReturnTypeParameters<DeSerializersT>, boolean>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnTypeCollection}.
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>, string[]>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportNullableTest}.
 */
export interface TestFunctionImportNullableTestParameters<DeSerializersT extends DeSerializers> {
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportNullableTest<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportNullableTestParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportNullableTestParameters<DeSerializersT>, string[] | null>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType}.
 */
export interface TestFunctionImportEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEntityReturnTypeParameters<DeSerializersT>, TestEntity>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnTypeCollection}.
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>, TestEntity[]>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnType}.
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): Omit<FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>, never>, 'execute'>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnTypeCollection}.
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): Omit<FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, never>, 'execute'>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnType}.
 */
export interface TestFunctionImportComplexReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportComplexReturnTypeParameters<DeSerializersT>, TestComplexType>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnTypeCollection}.
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>, TestComplexType[]>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportMultipleParams}.
 */
export interface TestFunctionImportMultipleParamsParameters<DeSerializersT extends DeSerializers> {
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportMultipleParams<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportMultipleParamsParameters<DeSerializersT>, boolean | null>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportWithDifferentName}.
 */
export interface TestFunctionImportWithDifferentNameParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportWithDifferentName<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestFunctionImportWithDifferentNameParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, TestFunctionImportWithDifferentNameParameters<DeSerializersT>, undefined>;
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