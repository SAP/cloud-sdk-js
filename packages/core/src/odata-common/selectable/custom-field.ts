import { Entity, Constructable } from '../entity';
import { EdmField } from './edm-field';
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

  edmString(): EdmField<EntityT, 'Edm.String', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.String',
      this._isNullable
    );
  }

  edmBoolean(): EdmField<EntityT, 'Edm.Boolean', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean',
      this._isNullable
    );
  }

  edmGuid(): EdmField<EntityT, 'Edm.Guid', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid',
      this._isNullable
    );
  }

  edmDecimal(): EdmField<EntityT, 'Edm.Decimal', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal',
      this._isNullable
    );
  }

  // TODO: GL
  edmInt16(): EdmField<EntityT, 'Edm.Int16', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16',
      this._isNullable
    );
  }

  edmInt32(): EdmField<EntityT, 'Edm.Int32', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32',
      this._isNullable
    );
  }

  edmInt64(): EdmField<EntityT, 'Edm.Int64', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64',
      this._isNullable
    );
  }

  edmSingle(): EdmField<EntityT, 'Edm.Single', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single',
      this._isNullable
    );
  }

  edmDouble(): EdmField<EntityT, 'Edm.Double', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double',
      this._isNullable
    );
  }

  edmByte(): EdmField<EntityT, 'Edm.Byte', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte',
      this._isNullable
    );
  }

  edmSByte(): EdmField<EntityT, 'Edm.SByte', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte',
      this._isNullable
    );
  }

  edmDateTimeOffset(): EdmField<EntityT, 'Edm.DateTimeOffset', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset',
      this._isNullable
    );
  }

  edmBinary(): EdmField<EntityT, 'Edm.Binary', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary',
      this._isNullable
    );
  }
}
