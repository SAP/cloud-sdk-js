import { ODataActionRequestConfig } from './odata-action-request-config';
import type {
  ODataUri,
  EntityBase,
  EntityApi,
  OperationParameters,
  WithKeys
} from '@sap-cloud-sdk/odata-common';
import type { DeSerializers } from '../de-serializers';

/**
 * Action request configuration for an entity type.
 * @template DeSerializersT - Type of the deserializer use on the request.
 * @template ParametersT - Type of the parameter to setup a request with.
 */
export class ODataBoundActionRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT
>
  extends ODataActionRequestConfig<DeSerializersT, ParametersT>
  implements WithKeys
{
  keys: Record<string, any>;
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    actionName: string,
    parameters: OperationParameters<ParametersT>,
    readonly oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
      entityApi.entityConstructor._defaultBasePath,
      actionName,
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
