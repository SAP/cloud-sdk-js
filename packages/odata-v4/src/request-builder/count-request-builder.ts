import { CountRequestBuilder as CountRequestBuilderCommon } from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { DeSerializers, DefaultDeSerializers } from '../de-serializers';

/**
 * Create an OData request to count entities based on the configuration of the request.
 * A `CountRequestBuilder` allows only for execution of the request.
 * If you want to apply query parameters like filter, skip or top do it on the [[GetAllRequestBuilder]] the count is created from.
 * @typeparam EntityT - Type of the entity to be requested
 * @typeparam EntityT - Type of the entity to be requested
 * @internal
 */
export class CountRequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends CountRequestBuilderCommon<EntityT, DeSerializersT> {}
