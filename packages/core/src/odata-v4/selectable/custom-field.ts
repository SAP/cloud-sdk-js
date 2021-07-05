import {
  CustomField as CustomFieldBase,
  EdmField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDate(): EdmField<EntityT, 'Edm.Date', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Date',
      this._isNullable
    );
  }
  edmDuration(): EdmField<EntityT, 'Edm.Duration', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Duration',
      this._isNullable
    );
  }
  edmTimeOfDay(): EdmField<EntityT, 'Edm.TimeOfDay', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.TimeOfDay',
      this._isNullable
    );
  }
}

export { CustomField as CustomFieldV4 };
