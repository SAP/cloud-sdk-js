import {
  ODataUri,
  EntityBase,
  RequestMethodType,
  EntityApi,
  OperationParameters,
  WithKeys
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { ODataActionRequestConfig } from './odata-action-request-config';

/**
 * Action request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
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
    method: RequestMethodType,
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
