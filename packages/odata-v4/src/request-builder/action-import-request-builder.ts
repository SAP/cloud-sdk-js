// eslint-disable-next-line import/no-internal-modules
import { ActionFunctionImportRequestBuilderBase } from '@sap-cloud-sdk/odata-common/internal';
import { ODataActionImportRequestConfig } from '../request/odata-action-import-request-config';
import { ActionImportParameters } from '../request/action-import-parameter';

/**
 * Create an OData request to execute an action import.
 * @typeparam ParametersT - Type of the action import parameters
 * @typeparam ReturnT - Type of the action import return value
 */
export class ActionImportRequestBuilder<
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  ODataActionImportRequestConfig<ParametersT>
> {
  /**
   * Creates an instance of ActionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the action belongs to
   * @param actionImportName - The name of the action import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the action
   */
  constructor(
    defaultServicePath: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>
  ) {
    super(
      responseTransformer,
      new ODataActionImportRequestConfig(
        defaultServicePath,
        actionImportName,
        parameters
      )
    );
  }
}
