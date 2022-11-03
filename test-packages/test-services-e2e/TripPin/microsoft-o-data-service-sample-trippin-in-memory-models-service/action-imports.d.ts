/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  ActionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
/**
 * Type of the parameters to be passed to {@link resetDataSource}.
 */
export interface ResetDataSourceParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Reset Data Source.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function resetDataSource<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ResetDataSourceParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  ResetDataSourceParameters<DeSerializersT>,
  undefined
>;
export declare const actionImports: {
  resetDataSource: typeof resetDataSource;
};
//# sourceMappingURL=action-imports.d.ts.map
