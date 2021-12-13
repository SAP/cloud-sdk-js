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
  // todo this is exactly the same as v2, move to common
  constructor(public entityApi: EntityApi<EntityT, DeSerializersT>) {
    super();
  }
}
