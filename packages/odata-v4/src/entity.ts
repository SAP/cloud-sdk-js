import {
  EntityBase,
  Constructable
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from './de-serializers';
import { CustomField } from './selectable';

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class Entity extends EntityBase {
  protected static customFieldSelector<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers,
    NullableT extends boolean = false
  >(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ): CustomField<EntityT, DeSerializersT, NullableT> {
    return new CustomField(fieldName, entityConstructor, isNullable);
  }

  readonly _oDataVersion: 'v4' = 'v4';
}
