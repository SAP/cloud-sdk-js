import type { DefaultDeSerializers, DeSerializers } from './de-serializers';
import type { RequestBuilder } from './request-builder';
import type { CustomField } from './selectable';
import type {
  Constructable,
  EntityBase,
  EntityBuilderType
} from './entity-base';

/**
 * @internal
 * Represents the API of an entity, including its request and entity builders as well as its schema.
 * @typeparam EntityT - Type of the entity.
 * @typeparam DeSerializersT - Type of the (de-)serializers.
 * @typeparam JsonT - Type of the entity without methods.
 */
export interface EntityApi<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  deSerializers: DeSerializersT;

  requestBuilder(): RequestBuilder<EntityT, DeSerializersT>;

  entityBuilder(): EntityBuilderType<EntityT, DeSerializersT>;

  entityConstructor: Constructable<EntityT>;
  schema: Record<string, any>;

  customField<NullableT extends boolean>(
    fieldName: string
  ): CustomField<EntityT, DeSerializersT, NullableT>;
}

/**
 * @internal
 */
export type EntityType<forExtraction> = forExtraction extends EntityApi<
  infer EntityT,
  any
>
  ? EntityT
  : never;
