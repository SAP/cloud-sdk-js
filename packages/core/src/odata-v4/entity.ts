import { EntityBase, Constructable } from '../odata-common';
import { CustomFieldV4 } from './selectable/custom-field';

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class EntityV4<DateTimeT> extends EntityBase<DateTimeT> {
  protected static customFieldSelector<EntityT extends EntityBase>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomFieldV4<EntityT> {
    return new CustomFieldV4(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v4' = 'v4';
}
