import { Entity, Constructable } from '../entity';
import { EdmTypeField } from './edm-type-field';
import { Field } from './field';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, isNullable);
  }

  edmString(): EdmTypeField<EntityT, 'Edm.String', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.String',
      this._isNullable
    );
  }

  edmBoolean(): EdmTypeField<EntityT, 'Edm.Boolean', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean',
      this._isNullable
    );
  }

  edmGuid(): EdmTypeField<EntityT, 'Edm.Guid', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid',
      this._isNullable
    );
  }

  edmDecimal(): EdmTypeField<EntityT, 'Edm.Decimal', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal',
      this._isNullable
    );
  }

  // TODO: GL
  edmInt16(): EdmTypeField<EntityT, 'Edm.Int16', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16',
      this._isNullable
    );
  }

  edmInt32(): EdmTypeField<EntityT, 'Edm.Int32', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32',
      this._isNullable
    );
  }

  edmInt64(): EdmTypeField<EntityT, 'Edm.Int64', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64',
      this._isNullable
    );
  }

  edmSingle(): EdmTypeField<EntityT, 'Edm.Single', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single',
      this._isNullable
    );
  }

  edmDouble(): EdmTypeField<EntityT, 'Edm.Double', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double',
      this._isNullable
    );
  }

  edmByte(): EdmTypeField<EntityT, 'Edm.Byte', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte',
      this._isNullable
    );
  }

  edmSByte(): EdmTypeField<EntityT, 'Edm.SByte', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte',
      this._isNullable
    );
  }

  edmDateTimeOffset(): EdmTypeField<EntityT, 'Edm.DateTimeOffset', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset',
      this._isNullable
    );
  }

  edmBinary(): EdmTypeField<EntityT, 'Edm.Binary', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary',
      this._isNullable
    );
  }
}
