import { Entity } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { SelectableField } from './selectable';
import { Field } from './field';
import { ConstructorOrField } from './constructor-or-field';
import { getEntityConstructor } from './complex-type-field';

export class CollectionField<
    EntityT extends Entity,
    CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any> = any,
    NullableT extends boolean = false
  >
  extends Field<EntityT, NullableT>
  implements SelectableField
{
  readonly selectable: true;

  /**
   *
   * Creates an instance of CollectionField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param _fieldType - Edm type of the field according to the metadata description.
   * @param isNullable - Whether the field can have the value `null`.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    readonly _fieldType: CollectionFieldT,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, getEntityConstructor(fieldOf), isNullable);
  }
}
