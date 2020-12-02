import { EntityBase, Constructable } from '../entity';
import { BigNumberField } from './big-number-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { Field } from './field';
import { NumberField } from './number-field';
import { StringField } from './string-field';

export class CustomFieldBase<
  EntityT extends EntityBase
> extends Field<EntityT> {
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
}
