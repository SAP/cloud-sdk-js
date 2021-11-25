import { RequestBuilder as RequestBuilderCommon } from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
// import { EntityBase, EntityIdentifiable, Constructable } from './entity';

export abstract class RequestBuilder<
  EntityT extends Entity,
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilderCommon<EntityT> {
  constructor(public deSerializers: T, public schema: Record<string, any>) {
    super();
  }
}
