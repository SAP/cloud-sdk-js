/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable, ConstructableODataV4 } from '../constructable';
import { Entity, EntityODataV4 } from '../entity';
import { BigNumberField, BigNumberFieldODataV4 } from './big-number-field';
import { BooleanField, BooleanFieldODataV4 } from './boolean-field';
import { DateField, DateFieldODataV4 } from './date-field';
import { Field, FieldODataV4 } from './field';
import { NumberField, NumberFieldODataV4 } from './number-field';
import { StringField, StringFieldODataV4 } from './string-field';
import { TimeField, TimeFieldODataV4 } from './time-field';

export class CustomField<EntityT extends Entity> extends Field<EntityT> {
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>
  ) {
    super(_fieldName, _entityConstructor);
  }

  edmString(): StringField<EntityT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.String'
    );
  }

  edmBoolean(): BooleanField<EntityT> {
    return new BooleanField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean'
    );
  }

  edmGuid(): StringField<EntityT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid'
    );
  }

  edmDecimal(): BigNumberField<EntityT> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal'
    );
  }

  edmInt16(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16'
    );
  }

  edmInt32(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32'
    );
  }

  edmInt64(): BigNumberField<EntityT> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64'
    );
  }

  edmSingle(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single'
    );
  }

  edmDouble(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double'
    );
  }

  edmByte(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte'
    );
  }

  edmSByte(): NumberField<EntityT> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte'
    );
  }

  edmDateTime(): DateField<EntityT> {
    return new DateField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime'
    );
  }

  edmDateTimeOffset(): DateField<EntityT> {
    return new DateField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset'
    );
  }

  edmBinary(): StringField<EntityT> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary'
    );
  }

  edmTime(): TimeField<EntityT> {
    return new TimeField(this._fieldName, this._entityConstructor, 'Edm.Time');
  }
}

export class CustomFieldODataV4<EntityT extends EntityODataV4> extends FieldODataV4<EntityT> {
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: ConstructableODataV4<EntityT>
  ) {
    super(_fieldName, _entityConstructor);
  }

  edmString(): StringFieldODataV4<EntityT> {
    return new StringFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.String'
    );
  }

  edmBoolean(): BooleanFieldODataV4<EntityT> {
    return new BooleanFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean'
    );
  }

  edmGuid(): StringFieldODataV4<EntityT> {
    return new StringFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid'
    );
  }

  edmDecimal(): BigNumberFieldODataV4<EntityT> {
    return new BigNumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal'
    );
  }

  edmInt16(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16'
    );
  }

  edmInt32(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32'
    );
  }

  edmInt64(): BigNumberFieldODataV4<EntityT> {
    return new BigNumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64'
    );
  }

  edmSingle(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single'
    );
  }

  edmDouble(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double'
    );
  }

  edmByte(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte'
    );
  }

  edmSByte(): NumberFieldODataV4<EntityT> {
    return new NumberFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte'
    );
  }

  edmDateTime(): DateFieldODataV4<EntityT> {
    return new DateFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime'
    );
  }

  edmDateTimeOffset(): DateFieldODataV4<EntityT> {
    return new DateFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset'
    );
  }

  edmBinary(): StringFieldODataV4<EntityT> {
    return new StringFieldODataV4(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary'
    );
  }

  edmTime(): TimeFieldODataV4<EntityT> {
    return new TimeFieldODataV4(this._fieldName, this._entityConstructor, 'Edm.Time');
  }
}
