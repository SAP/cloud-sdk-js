import { RequestBuilder as RequestBuilderCommon } from '@sap-cloud-sdk/odata-common';
import { DeSerializationMiddlewareBASE } from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { DeSerializationMiddleware } from '../de-serializers/de-serialization-middleware';
import { Entity } from '../entity';
// import { EntityBase, EntityIdentifiable, Constructable } from './entity';

export abstract class RequestBuilder<
  EntityT extends Entity,
  T extends DeSerializationMiddlewareBASE = DeSerializationMiddleware
> extends RequestBuilderCommon<EntityT> {
  constructor(public deSerializers: T, public schema: Record<string, any>) {
    super();
  }
}
