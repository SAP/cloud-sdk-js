import { ActionFunctionImportRequestBuilderBase } from '@sap-cloud-sdk/odata-common/internal';
import {
  ODataActionImportRequestConfig,
  ActionImportParameters
} from '../request';
import { DeSerializers } from '../de-serializers';
import { createODataUri } from '../uri-conversion';

/**
 * Create an OData request to execute an action import.
 * @typeparam ParametersT - Type of the action import parameters.
 * @typeparam ReturnT - Type of the action import return value.
 */
export class ActionImportRequestBuilder<
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  ODataActionImportRequestConfig<DeSerializersT, ParametersT>
> {
  /**
   * Creates an instance of ActionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the action belongs to.
   * @param actionImportName - The name of the action import.
   * @param responseTransformer - Transformation function for the response.
   * @param parameters - Parameters to be set in the action.
   * @param deSerializers - DeSerializer used in the action import.
   */
  constructor(
    defaultServicePath: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      responseTransformer,
      new ODataActionImportRequestConfig(
        defaultServicePath,
        actionImportName,
        parameters,
        createODataUri(deSerializers)
      )
    );
  }
}
