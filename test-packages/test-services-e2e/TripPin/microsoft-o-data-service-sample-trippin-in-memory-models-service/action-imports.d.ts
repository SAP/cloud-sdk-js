import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core';
/**
 * Type of the parameters to be passed to [[resetDataSource]].
 */
export interface ResetDataSourceParameters {
}
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function resetDataSource(parameters: ResetDataSourceParameters): ActionImportRequestBuilder<ResetDataSourceParameters, undefined>;
export declare const actionImports: {
    resetDataSource: typeof resetDataSource;
};
//# sourceMappingURL=action-imports.d.ts.map