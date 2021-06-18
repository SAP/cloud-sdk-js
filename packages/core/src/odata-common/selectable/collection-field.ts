import { Entity } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { SelectableEdmTypeField } from './edm-type-field';
import { Field } from './field';
import { ComplexTypeNamespace } from './complex-type-namespace';
import { getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';

/**
 *
 * Represents a static field of an entity or complex type.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam FieldT - Type of the entries of the collection in the field
 */
export class CollectionField<
    EntityT extends Entity,
    FieldT extends EdmTypeShared<'any'> | Record<string, any> = any
  >
  extends Field<EntityT>
  implements SelectableEdmTypeField
{
  readonly selectable: true;

  /**
   *
   * Creates an instance of CollectionField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param _fieldType - Type of the field according to the metadata description.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    readonly _fieldType: FieldT | ComplexTypeNamespace<FieldT>
  ) {
    super(fieldName, getEntityConstructor(fieldOf));
  }
}
