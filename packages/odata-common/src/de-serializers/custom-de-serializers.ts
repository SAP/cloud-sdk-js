import { DeserializedType, DeSerializer } from './de-serializers';
import { DefaultDeSerializers } from './default-de-serializers';

/**
 * Infers the deserialized type for an EDM type, based on custom (de-)serializers.
 * If the custom (de-)serializers specify a type for the given EDM type, this type is inferred.
 * Otherwise the given DefaultType is used.
 * @typeparam CustomDeSerializerT - Type of the custom (de-)serializers.
 * @typeparam EdmT - The EDM type to infer the type for.
 */
export type CustomOrDefaultType<
  CustomDeSerializerT,
  EdmT,
  DefaultDeSerializersT extends DefaultDeSerializers
> = EdmT extends keyof CustomDeSerializerT
  ? CustomDeSerializerT[EdmT] extends DeSerializer<infer CustomT> | undefined
    ? CustomT
    : DeserializedType<DefaultDeSerializersT, EdmT>
  : DeserializedType<DefaultDeSerializersT, EdmT>;
