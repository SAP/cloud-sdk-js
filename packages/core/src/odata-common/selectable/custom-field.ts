import { Entity, Constructable } from '../entity';
import { Field } from './field';
import { EdmTypeClassByType, FieldBuilder } from './field-builder';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  protected fieldBuilder: FieldBuilder<EntityT, Constructable<EntityT>>;
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, { isNullable });
    this.fieldBuilder = new FieldBuilder(entityConstructor);
  }

  edmString(): EdmTypeClassByType<EntityT, 'Edm.String', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.String',
      this._fieldOptions.isNullable
    );
  }

  edmBoolean(): EdmTypeClassByType<EntityT, 'Edm.Boolean', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Boolean',
      this._fieldOptions.isNullable
    );
  }

  edmGuid(): EdmTypeClassByType<EntityT, 'Edm.Guid', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Guid',
      this._fieldOptions.isNullable
    );
  }

  edmDecimal(): EdmTypeClassByType<EntityT, 'Edm.Decimal', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Decimal',
      this._fieldOptions.isNullable
    );
  }

  edmInt16(): EdmTypeClassByType<EntityT, 'Edm.Int16', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int16',
      this._fieldOptions.isNullable
    );
  }

  edmInt32(): EdmTypeClassByType<EntityT, 'Edm.Int32', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int32',
      this._fieldOptions.isNullable
    );
  }

  edmInt64(): EdmTypeClassByType<EntityT, 'Edm.Int64', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int64',
      this._fieldOptions.isNullable
    );
  }

  edmSingle(): EdmTypeClassByType<EntityT, 'Edm.Single', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Single',
      this._fieldOptions.isNullable
    );
  }

  edmDouble(): EdmTypeClassByType<EntityT, 'Edm.Double', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Double',
      this._fieldOptions.isNullable
    );
  }

  edmByte(): EdmTypeClassByType<EntityT, 'Edm.Byte', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Byte',
      this._fieldOptions.isNullable
    );
  }

  edmSByte(): EdmTypeClassByType<EntityT, 'Edm.SByte', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.SByte',
      this._fieldOptions.isNullable
    );
  }

  edmDateTimeOffset(): EdmTypeClassByType<
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

  edmBinary(): EdmTypeClassByType<EntityT, 'Edm.Binary', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Binary',
      this._fieldOptions.isNullable
    );
  }
}
