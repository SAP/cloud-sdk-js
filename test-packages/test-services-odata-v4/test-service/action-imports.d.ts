import { ActionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestComplexType } from './TestComplexType';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterNoReturnType}.
 */
export interface TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterNoReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>, undefined>;
/**
 * Type of the parameters to be passed to {@link testActionImportMultipleParameterComplexReturnType}.
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT extends DeSerializers> {
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
export declare function testActionImportMultipleParameterComplexReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>, TestComplexType>;
/**
 * Type of the parameters to be passed to {@link testActionImportUnsupportedEdmTypes}.
 */
export interface TestActionImportUnsupportedEdmTypesParameters<DeSerializersT extends DeSerializers> {
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
export declare function testActionImportUnsupportedEdmTypes<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>, any>;
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterEntityReturnType}.
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>, TestEntity>;
/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnType}.
 */
export interface TestActionImportSharedEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>, deSerializers?: DeSerializersT): Omit<ActionImportRequestBuilder<DeSerializersT, TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>, never>, 'execute'>;
/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnTypeCollection}.
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportSharedEntityReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): Omit<ActionImportRequestBuilder<DeSerializersT, TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, never>, 'execute'>;
/**
 * Type of the parameters to be passed to {@link testActionImportNullableTest}.
 */
export interface TestActionImportNullableTestParameters<DeSerializersT extends DeSerializers> {
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
export declare function testActionImportNullableTest<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNullableTestParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, TestActionImportNullableTestParameters<DeSerializersT>, TestComplexType | null>;
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