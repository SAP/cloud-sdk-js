// eslint-disable-next-line max-classes-per-file
import { ODataActionRequestConfig } from './odata-action-request-config';
import type {
  ODataUri,
  EntityBase,
  RequestMethodType,
  EntityApi,
  OperationParameters,
  WithKeys
} from '@sap-cloud-sdk/odata-common';
import type { DeSerializers } from '../de-serializers';

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

/**
 * @deprecated Since 3.3.0. Use {@link ODataBoundActionRequestConfig} instead.
 */
export class ODataBoundActionImportRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataBoundActionRequestConfig<EntityT, DeSerializersT, ParametersT> {
  constructor(
    /**
     * @deprecated Since 3.3.0. This parameter is unused and will be removed in the next major release.
     */
    method: RequestMethodType,
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    actionName: string,
    parameters: OperationParameters<ParametersT>,
    readonly oDataUri: ODataUri<DeSerializersT>
  ) {
    super(entityApi, actionName, parameters, oDataUri);
  }
}
