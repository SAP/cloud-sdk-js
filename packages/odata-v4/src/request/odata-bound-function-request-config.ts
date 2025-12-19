import { ODataFunctionRequestConfig } from './odata-function-request-config';
import type {
  ODataUri,
  OperationParameters,
  RequestMethodType,
  WithKeys,
  EntityApi,
  EntityBase
} from '@sap-cloud-sdk/odata-common';
import type { DeSerializers } from '../de-serializers';

/**
 * Function request configuration for an entity type.
 * @template DeSerializersT - Type of the deserializer use on the request.
 * @template ParametersT - Type of the parameter to setup a request with.
 */
export class ODataBoundFunctionRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT
>
  extends ODataFunctionRequestConfig<DeSerializersT, ParametersT>
  implements WithKeys
{
  keys: Record<string, any>;
  constructor(
    method: RequestMethodType,
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    functionName: string,
    parameters: OperationParameters<ParametersT>,
    readonly oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
      method,
      entityApi.entityConstructor._defaultBasePath,
      functionName,
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
