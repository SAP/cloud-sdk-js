import {
  ActionImportRequestBuilder,
  DeSerializers,
  DefaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
/**
 * Type of the parameters to be passed to {@link resetDataSource_4}.
 */
export interface ResetDataSource4Parameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function resetDataSource_4<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ResetDataSource4Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  ResetDataSource4Parameters<DeSerializersT>,
  undefined
>;
export declare const actionImports: {
  resetDataSource_4: typeof resetDataSource_4;
};
//# sourceMappingURL=action-imports.d.ts.map
