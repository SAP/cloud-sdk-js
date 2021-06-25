import { Entity as EntityBase, Constructable } from '../odata-common';
import { CustomField } from './selectable';

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class Entity extends EntityBase {
  protected static customFieldSelector<EntityT extends Entity>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomField<EntityT> {
    return new CustomField(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v4' = 'v4';
}

export { Entity as EntityV4 };
