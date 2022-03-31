import { FunctionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnSapCloudSdk<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnSapCloudSdkParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnSapCloudSdkParameters<DeSerializersT>, string | null>;
/**
 * Type of the parameters to be passed to [[concatStrings]].
 */
export interface ConcatStringsParameters<DeSerializersT extends DeSerializers> {
    /**
     * Str 1.
     */
    str1?: string | null;
    /**
     * Str 2.
     */
    str2?: string | null;
}
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ConcatStringsParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ConcatStringsParameters<DeSerializersT>, string | null>;
/**
 * Type of the parameters to be passed to [[returnInt]].
 */
export interface ReturnIntParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param?: number | null;
}
/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnIntParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnIntParameters<DeSerializersT>, number | null>;
/**
 * Type of the parameters to be passed to [[returnCollection]].
 */
export interface ReturnCollectionParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param?: number | null;
}
/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ReturnCollectionParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, ReturnCollectionParameters<DeSerializersT>, number[]>;
/**
 * Type of the parameters to be passed to [[getByKey]].
 */
export interface GetByKeyParameters<DeSerializersT extends DeSerializers> {
    /**
     * Param.
     */
    param?: number | null;
}
/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetByKeyParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, GetByKeyParameters<DeSerializersT>, TestEntity | null>;
/**
 * Type of the parameters to be passed to [[getAll]].
 */
export interface GetAllParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getAll<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: GetAllParameters<DeSerializersT>, deSerializers?: DeSerializersT): FunctionImportRequestBuilder<DeSerializersT, GetAllParameters<DeSerializersT>, TestEntity[]>;
export declare const functionImports: {
    returnSapCloudSdk: typeof returnSapCloudSdk;
    concatStrings: typeof concatStrings;
    returnInt: typeof returnInt;
    returnCollection: typeof returnCollection;
    getByKey: typeof getByKey;
    getAll: typeof getAll;
};
//# sourceMappingURL=function-imports.d.ts.map