import { EntityBase, Constructable } from '../entity-base';

export class AllFields<EntityT extends EntityBase> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT>
  ) {
    this._fieldName = '*';
  }
}
