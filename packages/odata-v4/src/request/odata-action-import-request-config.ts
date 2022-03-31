import {
  ODataRequestConfig,
  ODataUri
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import {
  ActionImportParameters,
  ActionImportParameter
} from './action-import-parameter';

/**
 * @internal
 */
export class ODataActionImportRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   * @param defaultServicePath - Default path of the service.
   * @param actionImportName - The name of the action import.
   * @param parameters - Parameters of the action imports.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    public parameters: ActionImportParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super('post', defaultServicePath);
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): Record<string, any> {
    return {};
  }

  private buildHttpPayload(
    parameters: ActionImportParameters<ParametersT>
  ): Record<string, any> {
    const payload = Object.keys(parameters).reduce((all, key) => {
      const payloadElement: ActionImportParameter<ParametersT> =
        parameters[key];
      if (typeof payloadElement.value !== 'undefined') {
        all[payloadElement.originalName] = payloadElement.value;
      }
      return all;
    }, {});

    return payload;
  }
}
