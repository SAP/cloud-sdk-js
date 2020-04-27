import { Entity } from '../entity';
import { SelectableEdmTypeField } from './edm-type-field';
import { Constructable } from '../constructable';
import { SimpleTypeFields } from './simple-type-fields';
import { ComplexTypeField } from './complex-type-field';

export class CollectionField<EntityT extends Entity>
  implements SelectableEdmTypeField {
  readonly selectable: true;
  // todo simple type field + complex + navi
  constructor( readonly _fieldName: string, readonly _entityConstructor: Constructable<EntityT>, readonly _elementType: SimpleTypeFields<EntityT> | ComplexTypeField<EntityT>){

  }
}
