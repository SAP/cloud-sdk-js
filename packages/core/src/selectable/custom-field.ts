/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity } from '../entity';
import { ODataV2 } from '../odata-v2';
import { BigNumberField } from './big-number-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { Field } from './field';
import { NumberField } from './number-field';
import { StringField } from './string-field';
import { TimeField } from './time-field';

export class CustomField<
  EntityT extends Entity<Version> ,
  Version=ODataV2
> extends Field<EntityT,Version> {
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT,{},Version>
  ) {
    super(_fieldName, _entityConstructor);
  }

  edmString(): StringField<EntityT,Version> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.String'
    );
  }

  edmBoolean(): BooleanField<EntityT,Version> {
    return new BooleanField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Boolean'
    );
  }

  edmGuid(): StringField<EntityT,Version> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Guid'
    );
  }

  edmDecimal(): BigNumberField<EntityT,Version> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Decimal'
    );
  }

  edmInt16(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int16'
    );
  }

  edmInt32(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int32'
    );
  }

  edmInt64(): BigNumberField<EntityT,Version> {
    return new BigNumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Int64'
    );
  }

  edmSingle(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Single'
    );
  }

  edmDouble(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Double'
    );
  }

  edmByte(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Byte'
    );
  }

  edmSByte(): NumberField<EntityT,Version> {
    return new NumberField(
      this._fieldName,
      this._entityConstructor,
      'Edm.SByte'
    );
  }

  edmDateTime(): DateField<EntityT,Version> {
    return new DateField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime'
    );
  }

  edmDateTimeOffset(): DateField<EntityT,Version> {
    return new DateField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTimeOffset'
    );
  }

  edmBinary(): StringField<EntityT,Version> {
    return new StringField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Binary'
    );
  }

  edmTime(): TimeField<EntityT,Version> {
    return new TimeField(this._fieldName, this._entityConstructor, 'Edm.Time');
  }
}
