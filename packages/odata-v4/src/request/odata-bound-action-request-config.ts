import {
  ODataUri,
  EntityBase,
  RequestMethodType,
  EntityApi,
  WithKeys
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { ActionImportParameters } from './action-import-parameter';
import { ODataActionImportRequestConfig } from './odata-action-import-request-config';

/**
 * Action import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataBoundActionImportRequestConfig<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    ParametersT
  >
  extends ODataActionImportRequestConfig<DeSerializersT, ParametersT>
  implements WithKeys
{
  keys: Record<string, any>;
  constructor(
    method: RequestMethodType,
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    functionImportName: string,
    parameters: ActionImportParameters<ParametersT>,
    readonly oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
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
