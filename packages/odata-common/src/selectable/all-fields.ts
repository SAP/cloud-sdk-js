import { EntityBase, Constructable } from '../entity-base';

/**
 * Represents the selection of all fields.
 * This field should be used in the schema of entities.
 */
export class AllFields<EntityT extends EntityBase> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT>
  ) {
    this._fieldName = '*';
  }
}
