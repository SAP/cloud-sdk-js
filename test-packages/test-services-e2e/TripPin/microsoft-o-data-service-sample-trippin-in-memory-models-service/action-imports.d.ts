import '@sap-cloud-sdk/odata-common/internal';
import { ActionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
/**
 * Type of the parameters to be passed to [[resetDataSource]].
 */
export interface ResetDataSourceParameters<DeSerializersT extends DeSerializers> {
}
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function resetDataSource<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: ResetDataSourceParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, ResetDataSourceParameters<DeSerializersT>, undefined>;
export declare const actionImports: {
    resetDataSource: typeof resetDataSource;
};
//# sourceMappingURL=action-imports.d.ts.map