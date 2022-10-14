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
 * Action import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataBoundActionImportRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  entitySetName: string;
  serviceClassName: string;
  entityQueryString: string;
  /**
   * Creates an instance of ODataActionImportRequestConfig.
   * @param defaultServicePath - Default path of the service.
   * @param entitySetName - The name of the entity set.
   * @param entityQueryString - The string to query the instance of the entity this action is bound to.
   * @param serviceClassName - The name of the service class.
   * @param actionImportName - The name of the action import.
   * @param parameters - Parameters of the action imports.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    defaultServicePath: string,
    entitySetName: string,
    entityQueryString: string,
    serviceClassName: string,
    readonly actionImportName: string,
    public parameters: ActionImportParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super('post', defaultServicePath);
    this.entitySetName = entitySetName;
    this.serviceClassName = serviceClassName;
    this.entityQueryString = entityQueryString;
    this.payload = this.buildHttpPayload(parameters);
  }

  resourcePath(): string {
    return `${this.entitySetName}(${this.entityQueryString})/${this.serviceClassName}.${this.actionImportName}`;
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
