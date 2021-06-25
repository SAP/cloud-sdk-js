import { Entity as EntityBase, Constructable } from '../odata-common';
import { CustomField } from './selectable';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  protected static customFieldSelector<EntityT extends Entity>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomField<EntityT> {
    return new CustomField(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v2' = 'v2';
}

export { Entity as EntityV2 };
