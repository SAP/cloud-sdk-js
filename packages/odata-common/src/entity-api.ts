import type { DefaultDeSerializers, DeSerializers } from './de-serializers';
import type { RequestBuilder } from './request-builder';
import type { CustomField } from './selectable';
import type {
  Constructable,
  EntityBase,
  EntityBuilderType
} from './entity-base';

/**
 * Represents the API of an entity, including its request and entity builders as well as its schema.
 * @typeParam EntityT - Type of the entity.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 * @typeParam JsonT - Type of the entity without methods.
 */
export interface EntityApi<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Set of functions that determine (de-)serialization per EDM type.
   */
  deSerializers: DeSerializersT;

  requestBuilder(): RequestBuilder<EntityT, DeSerializersT>;

  entityBuilder(): EntityBuilderType<EntityT, DeSerializersT>;

  /**
   * Constructor function for the entity.
   */
  entityConstructor: Constructable<EntityT>;
  /**
   * Schema of the entity api.
   */
  schema: Record<string, any>;

  customField<NullableT extends boolean>(
    fieldName: string
  ): CustomField<EntityT, DeSerializersT, NullableT>;
}

/**
 * Helper type to extract the type of an entity from an API so EntityType<MyPetApi<Dog>> is `Dog`.
 */
export type EntityType<forExtraction> = forExtraction extends EntityApi<
  infer EntityT,
  any
>
  ? EntityT
  : never;
