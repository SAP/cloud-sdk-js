import { FunctionImportRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[concatStrings]].
 */
export interface ConcatStringsParameters {
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
export declare function concatStrings(parameters: ConcatStringsParameters): FunctionImportRequestBuilder<ConcatStringsParameters, string>;
/**
 * Type of the parameters to be passed to [[getAll]].
 */
export interface GetAllParameters {
}
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getAll(parameters: GetAllParameters): FunctionImportRequestBuilder<GetAllParameters, TestEntity[]>;
/**
 * Type of the parameters to be passed to [[getByKey]].
 */
export interface GetByKeyParameters {
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
export declare function getByKey(parameters: GetByKeyParameters): FunctionImportRequestBuilder<GetByKeyParameters, TestEntity>;
/**
 * Type of the parameters to be passed to [[returnCollection]].
 */
export interface ReturnCollectionParameters {
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
export declare function returnCollection(parameters: ReturnCollectionParameters): FunctionImportRequestBuilder<ReturnCollectionParameters, number[]>;
/**
 * Type of the parameters to be passed to [[returnInt]].
 */
export interface ReturnIntParameters {
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
export declare function returnInt(parameters: ReturnIntParameters): FunctionImportRequestBuilder<ReturnIntParameters, number>;
/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters {
}
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnSapCloudSdk(parameters: ReturnSapCloudSdkParameters): FunctionImportRequestBuilder<ReturnSapCloudSdkParameters, string>;
export declare const functionImports: {
    concatStrings: typeof concatStrings;
    getAll: typeof getAll;
    getByKey: typeof getByKey;
    returnCollection: typeof returnCollection;
    returnInt: typeof returnInt;
    returnSapCloudSdk: typeof returnSapCloudSdk;
};
//# sourceMappingURL=function-imports.d.ts.map