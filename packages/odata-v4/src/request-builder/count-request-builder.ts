import { CountRequestBuilder as CountRequestBuilderCommon } from '@sap-cloud-sdk/odata-common';
import { Entity } from '../entity';
import { DeSerializers, DefaultDeSerializers } from '../de-serializers';

/**
 * Create an OData request to count entities based on the configuration of the request.
 * A `CountRequestBuilder` allows only for execution of the request.
 * If you want to apply query parameters like filter, skip or top do it on the {@link GetAllRequestBuilder} the count is created from.
 * @typeParam EntityT - Type of the entity to be requested.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 */
export class CountRequestBuilder<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends CountRequestBuilderCommon<EntityT, DeSerializersT> {}
