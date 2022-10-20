import { FunctionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
import { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
/**
 * Type of the parameters to be passed to {@link concatStrings}.
 */
export interface ConcatStringsParameters<DeSerializersT extends DeSerializers> {
    /**
     * Str 1.
     */
    str1: string;
    /**
     * Str 2.
     */
    str2: string;
}
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ConcatStringsParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ConcatStringsParameters<DeSerializersT>, string>;
/**
 * Type of the parameters to be passed to {@link getAll}.
 */
export interface GetAllParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getAll<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetAllParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, GetAllParameters<DeSerializersT>, TestEntity[]>;
/**
 * Type of the parameters to be passed to {@link getByKey}.
 */
export interface GetByKeyParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param: number;
}
/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetByKeyParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, GetByKeyParameters<DeSerializersT>, TestEntity>;
/**
 * Type of the parameters to be passed to {@link getByKeyWithMultipleKeys}.
 */
export interface GetByKeyWithMultipleKeysParameters<DeSerializersT extends DeSerializers> {
    /**
     * Key Test Entity With Multiple Keys.
     */
    keyTestEntityWithMultipleKeys: number;
    /**
     * String Property With Multiple Keys.
     */
    stringPropertyWithMultipleKeys: string;
    /**
     * Boolean Property With Multiple Keys.
     */
    booleanPropertyWithMultipleKeys: boolean;
}
/**
 * Get By Key With Multiple Keys.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getByKeyWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetByKeyWithMultipleKeysParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, GetByKeyWithMultipleKeysParameters<DeSerializersT>, TestEntityWithMultipleKeys>;
/**
 * Type of the parameters to be passed to {@link returnCollection}.
 */
export interface ReturnCollectionParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param: number;
}
/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnCollectionParameters<DeSerializersT>, number[]>;
/**
 * Type of the parameters to be passed to {@link returnInt}.
 */
export interface ReturnIntParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param: number;
}
/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnIntParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnIntParameters<DeSerializersT>, number>;
/**
 * Type of the parameters to be passed to {@link returnSapCloudSdk}.
 */
export interface ReturnSapCloudSdkParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnSapCloudSdk<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnSapCloudSdkParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnSapCloudSdkParameters<DeSerializersT>, string>;
export declare const functionImports: {
    concatStrings: typeof concatStrings;
    getAll: typeof getAll;
    getByKey: typeof getByKey;
    getByKeyWithMultipleKeys: typeof getByKeyWithMultipleKeys;
    returnCollection: typeof returnCollection;
    returnInt: typeof returnInt;
    returnSapCloudSdk: typeof returnSapCloudSdk;
};
//# sourceMappingURL=function-imports.d.ts.map