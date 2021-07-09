import { Entity, Constructable } from '../entity';
import { EdmTypeField } from './edm-type-field';
import { Field } from './field';
import { FieldBuilder } from './field-builder';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  protected fieldBuilder: FieldBuilder<Constructable<EntityT>>;
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, { isNullable });
    this.fieldBuilder = new FieldBuilder(entityConstructor);
  }

  edmString(): EdmTypeField<EntityT, 'Edm.String', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.String',
      this._fieldOptions.isNullable
    );
  }

  edmBoolean(): EdmTypeField<EntityT, 'Edm.Boolean', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Boolean',
      this._fieldOptions.isNullable
    );
  }

  edmGuid(): EdmTypeField<EntityT, 'Edm.Guid', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Guid',
      this._fieldOptions.isNullable
    );
  }

  edmDecimal(): EdmTypeField<EntityT, 'Edm.Decimal', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Decimal',
      this._fieldOptions.isNullable
    );
  }

  edmInt16(): OrderableEdmTypeField<EntityT, 'Edm.Int16', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int16',
      this._fieldOptions.isNullable
    );
  }

  edmInt32(): OrderableEdmTypeField<EntityT, 'Edm.Int32', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int32',
      this._fieldOptions.isNullable
    );
  }

  edmInt64(): OrderableEdmTypeField<EntityT, 'Edm.Int64', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int64',
      this._fieldOptions.isNullable
    );
  }

  edmSingle(): OrderableEdmTypeField<EntityT, 'Edm.Single', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Single',
      this._fieldOptions.isNullable
    );
  }

  edmDouble(): OrderableEdmTypeField<EntityT, 'Edm.Double', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Double',
      this._fieldOptions.isNullable
    );
  }

  edmByte(): OrderableEdmTypeField<EntityT, 'Edm.Byte', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Byte',
      this._fieldOptions.isNullable
    );
  }

  edmSByte(): OrderableEdmTypeField<EntityT, 'Edm.SByte', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.SByte',
      this._fieldOptions.isNullable
    );
  }

  edmDateTimeOffset(): OrderableEdmTypeField<
    EntityT,
    'Edm.DateTimeOffset',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTimeOffset',
      this._fieldOptions.isNullable
    );
  }

  edmBinary(): EdmTypeField<EntityT, 'Edm.Binary', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Binary',
      this._fieldOptions.isNullable
    );
  }
}
