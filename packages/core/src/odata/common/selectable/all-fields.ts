import { EntityBase, Constructable } from '../entity';

export class AllFields<EntityT extends EntityBase> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT>
  ) {
    this._fieldName = '*';
  }
}
