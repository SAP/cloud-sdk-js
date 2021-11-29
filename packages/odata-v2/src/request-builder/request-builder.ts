import {
  EntityApi,
  RequestBuilder as RequestBuilderCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import { Entity } from '../entity';

/**
 * @internal
 */
export abstract class RequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends RequestBuilderCommon<EntityT> {
  // constructor(public deSerializers: T, public schema: Record<string, any>) {
  constructor(public entityApi: EntityApi<EntityT, DeSerializersT>) {
    super();
  }
}
