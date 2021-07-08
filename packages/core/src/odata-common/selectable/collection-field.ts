import { Entity } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { Field, FieldOptions } from './field';
import { ConstructorOrField } from './constructor-or-field';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { ComplexTypeNamespace } from './complex-type-namespace';

export class CollectionField<
  EntityT extends Entity,
  CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any> = any,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  /**
   *
   * Creates an instance of CollectionField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param _fieldType - Edm type of the field according to the metadata description.
   *  @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly _fieldType: CollectionFieldType<CollectionFieldT>,
    fieldOptions?: Partial<FieldOptions<NullableT, SelectableT>>
  ) {
    super(fieldName, getEntityConstructor(_fieldOf), fieldOptions);
  }

  fieldPath(): string {
    return this._fieldOf instanceof ComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}

export type CollectionFieldType<
  CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any>
> = CollectionFieldT | ComplexTypeNamespace<CollectionFieldT>;
