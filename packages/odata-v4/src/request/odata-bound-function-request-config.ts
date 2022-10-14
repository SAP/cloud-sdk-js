import {
  ODataUri,
  FunctionImportParameters,
  RequestMethodType,
  WithKeys,
  EntityApi,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { ODataFunctionImportRequestConfig } from './odata-function-import-request-config';

/**
 * Function import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataBoundFunctionRequestConfig<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    ParametersT
  >
  extends ODataFunctionImportRequestConfig<DeSerializersT, ParametersT>
  implements WithKeys
{
  keys: Record<string, any>;
  constructor(
    method: RequestMethodType,
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    functionImportName: string,
    parameters: FunctionImportParameters<ParametersT>,
    readonly oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
      method,
      entityApi.entityConstructor._defaultServicePath,
      functionImportName,
      parameters,
      oDataUri
    );
  }

  resourcePath(): string {
    return `${this.oDataUri.getResourcePathForKeys(
      this.keys,
      this.entityApi
    )}/${super.resourcePath()}`;
  }

  queryParameters(): Record<string, any> {
    return {};
  }
}
