import { EntityBase, Constructable } from '../odata-common';
import { CustomFieldV2 } from './selectable/custom-field';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class EntityV2 extends EntityBase {
  protected static customFieldSelector<EntityT extends EntityBase>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomFieldV2<EntityT> {
    return new CustomFieldV2(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v2' = 'v2';
}

export { EntityV2 as Entity };
