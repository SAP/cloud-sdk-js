import { FunctionImportRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function getByKey(parameters: GetByKeyParameters): FunctionImportRequestBuilderV4<GetByKeyParameters, TestEntity>;
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function returnInt(parameters: ReturnIntParameters): FunctionImportRequestBuilderV4<ReturnIntParameters, number>;
/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters {
}
/**
 * Return Sap Cloud Sdk.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export declare function returnSapCloudSdk(parameters: ReturnSapCloudSdkParameters): FunctionImportRequestBuilderV4<ReturnSapCloudSdkParameters, string>;
export declare const functionImports: {
    getByKey: typeof getByKey;
    returnInt: typeof returnInt;
    returnSapCloudSdk: typeof returnSapCloudSdk;
};
//# sourceMappingURL=function-imports.d.ts.map