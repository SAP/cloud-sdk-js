import { Entity as EntityBase, Constructable } from '../odata-common';
import { CustomField } from './selectable';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  protected static customFieldSelector<
    EntityT extends Entity,
    NullableT extends boolean = false
  >(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ): CustomField<EntityT, NullableT> {
    return new CustomField(fieldName, entityConstructor, isNullable);
  }

  readonly _oDataVersion: 'v2' = 'v2';
}

export { Entity as EntityV2 };
