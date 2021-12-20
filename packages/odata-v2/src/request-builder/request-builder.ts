import {
  EntityApi,
  RequestBuilder as RequestBuilderCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';

/**
 * @internal
 */
export abstract class RequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
> extends RequestBuilderCommon<EntityT, DeSerializersT> {
  constructor(public entityApi: EntityApi<EntityT, DeSerializersT>) {
    super();
  }
}
