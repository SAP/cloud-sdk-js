import {
  ODataRequestConfig,
  ODataUri,
  OperationParameter,
  OperationParameters
} from '@sap-cloud-sdk/odata-common';
import { DeSerializers } from '../de-serializers';

/**
 * Action request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataActionRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionRequestConfig.
   * @param defaultBasePath - Default base path of the service.
   * @param actionName - The name of the action.
   * @param parameters - Parameters of the action.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    defaultBasePath: string,
    readonly actionName: string,
    public parameters: OperationParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super('post', defaultBasePath);
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return this.actionName;
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
