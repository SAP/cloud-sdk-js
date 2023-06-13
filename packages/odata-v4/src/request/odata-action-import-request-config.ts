import {
  ODataRequestConfig,
  ODataUri,
  OperationParameter,
  OperationParameters
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';

/**
 * Action import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataActionImportRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   * @param defaultBasePath - Default base path of the service.
   * @param actionImportName - The name of the action import.
   * @param parameters - Parameters of the action imports.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    defaultBasePath: string,
    readonly actionImportName: string,
    public parameters: OperationParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super('post', defaultBasePath);
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): Record<string, any> {
    return {};
  }

  private buildHttpPayload(
    parameters: OperationParameters<ParametersT>
  ): Record<string, any> {
    const payload = Object.keys(parameters).reduce((all, key) => {
      const payloadElement: OperationParameter<ParametersT> = parameters[key];
      if (typeof payloadElement.value !== 'undefined') {
        all[payloadElement.originalName] = payloadElement.value;
      }
      return all;
    }, {});

    return payload;
  }
}
