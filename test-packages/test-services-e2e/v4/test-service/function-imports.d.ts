import { FunctionImportRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[concatStrings]].
 */
export interface ConcatStringsParameters {
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function concatStrings(
  parameters: ConcatStringsParameters
): FunctionImportRequestBuilderV4<ConcatStringsParameters, string | null>;
/**
 * Type of the parameters to be passed to [[getAll]].
 */
export interface GetAllParameters {}
/**
 * Get All.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getAll(
  parameters: GetAllParameters
): FunctionImportRequestBuilderV4<GetAllParameters, TestEntity[]>;
/**
 * Type of the parameters to be passed to [[getByKey]].
 */
export interface GetByKeyParameters {
  /**
   * Param.
   */
  param?: number | null;
}
/**
 * Get By Key.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function getByKey(
  parameters: GetByKeyParameters
): FunctionImportRequestBuilderV4<GetByKeyParameters, TestEntity | null>;
/**
 * Type of the parameters to be passed to [[returnCollection]].
 */
export interface ReturnCollectionParameters {
  /**
   * Param.
   */
  param?: number | null;
}
/**
 * Return Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnCollection(
  parameters: ReturnCollectionParameters
): FunctionImportRequestBuilderV4<ReturnCollectionParameters, number[]>;
/**
 * Type of the parameters to be passed to [[returnInt]].
 */
export interface ReturnIntParameters {
  /**
   * Param.
   */
  param?: number | null;
}
/**
 * Return Int.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnInt(
  parameters: ReturnIntParameters
): FunctionImportRequestBuilderV4<ReturnIntParameters, number | null>;
/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters {}
/**
 * Return Sap Cloud Sdk.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function returnSapCloudSdk(
  parameters: ReturnSapCloudSdkParameters
): FunctionImportRequestBuilderV4<ReturnSapCloudSdkParameters, string | null>;
export declare const functionImports: {
  concatStrings: typeof concatStrings;
  getAll: typeof getAll;
  getByKey: typeof getByKey;
  returnCollection: typeof returnCollection;
  returnInt: typeof returnInt;
  returnSapCloudSdk: typeof returnSapCloudSdk;
};
//# sourceMappingURL=function-imports.d.ts.map
