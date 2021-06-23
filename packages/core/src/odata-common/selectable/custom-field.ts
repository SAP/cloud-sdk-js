import { Entity, Constructable } from '../entity';
import { BigNumberField } from './big-number-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { Field } from './field';
import { NumberField } from './number-field';
import { StringField } from './string-field';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends Field<EntityT> {
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    readonly isNullable: NullableT = false as NullableT
  ) {
    super(_fieldName, _entityConstructor);
  }

  edmString(): StringField<EntityT, NullableT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.String',
      this.isNullable
    );
  }

  edmBoolean(): BooleanField<EntityT, NullableT> {
    return new BooleanField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean',
      this.isNullable
    );
  }

  edmGuid(): StringField<EntityT, NullableT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid',
      this.isNullable
    );
  }

  edmDecimal(): BigNumberField<EntityT, NullableT> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal',
      this.isNullable
    );
  }

  edmInt16(): NumberField<EntityT, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16',
      this.isNullable
    );
  }

  edmInt32(): NumberField<EntityT, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32',
      this.isNullable
    );
  }

  edmInt64(): BigNumberField<EntityT, NullableT> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64',
      this.isNullable
    );
  }

  edmSingle(): NumberField<Entity, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single',
      this.isNullable
    );
  }

  edmDouble(): NumberField<EntityT, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double',
      this.isNullable
    );
  }

  edmByte(): NumberField<EntityT, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte',
      this.isNullable
    );
  }

  edmSByte(): NumberField<EntityT, NullableT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte',
      this.isNullable
    );
  }

  edmDateTimeOffset(): DateField<EntityT, NullableT> {
    return new DateField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset',
      this.isNullable
    );
  }

  edmBinary(): StringField<EntityT, NullableT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary',
      this.isNullable
    );
  }
}
