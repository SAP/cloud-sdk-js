import { Entity, Constructable } from '../entity';
import { Field } from './field';
import { EdmTypeClassByType, FieldBuilder } from './field-builder';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  protected fieldBuilder: FieldBuilder<EntityT>;
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, isNullable);
    this.fieldBuilder = new FieldBuilder(entityConstructor);
  }

  edmString(): EdmTypeClassByType<EntityT, 'Edm.String', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.String',
      this._isNullable
    );
  }

  edmBoolean(): EdmTypeClassByType<EntityT, 'Edm.Boolean', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Boolean',
      this._isNullable
    );
  }

  edmGuid(): EdmTypeClassByType<EntityT, 'Edm.Guid', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Guid',
      this._isNullable
    );
  }

  edmDecimal(): EdmTypeClassByType<EntityT, 'Edm.Decimal', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Decimal',
      this._isNullable
    );
  }

  edmInt16(): EdmTypeClassByType<EntityT, 'Edm.Int16', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int16',
      this._isNullable
    );
  }

  edmInt32(): EdmTypeClassByType<EntityT, 'Edm.Int32', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int32',
      this._isNullable
    );
  }

  edmInt64(): EdmTypeClassByType<EntityT, 'Edm.Int64', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int64',
      this._isNullable
    );
  }

  edmSingle(): EdmTypeClassByType<EntityT, 'Edm.Single', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Single',
      this._isNullable
    );
  }

  edmDouble(): EdmTypeClassByType<EntityT, 'Edm.Double', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Double',
      this._isNullable
    );
  }

  edmByte(): EdmTypeClassByType<EntityT, 'Edm.Byte', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Byte',
      this._isNullable
    );
  }

  edmSByte(): EdmTypeClassByType<EntityT, 'Edm.SByte', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.SByte',
      this._isNullable
    );
  }

  edmDateTimeOffset(): EdmTypeClassByType<
    EntityT,
    'Edm.DateTimeOffset',
    NullableT
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTimeOffset',
      this._isNullable
    );
  }

  edmBinary(): EdmTypeClassByType<EntityT, 'Edm.Binary', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Binary',
      this._isNullable
    );
  }
}
