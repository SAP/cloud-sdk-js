import { ODataRequestConfig } from '@sap-cloud-sdk/odata-common';
import {
  ActionImportParameters,
  ActionImportParameter
} from './action-import-parameter';

export class ODataActionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   * @param defaultServicePath - Default path of the service
   * @param actionImportName - The name of the action import.
   * @param parameters - Parameters of the action imports
   */
  constructor(
    defaultServicePath: string,
    readonly actionImportName: string,
    parameters: ActionImportParameters<ParametersT>
  ) {
    super('post', defaultServicePath);
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return this.actionImportName;
  }

  queryParameters(): Record<string, any> {
    return {
      ...this.prependDollarToQueryParameters({
        format: 'json'
      })
    };
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
