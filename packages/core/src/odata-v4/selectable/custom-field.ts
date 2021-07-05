import {
  CustomField as CustomFieldBase,
  EdmTypeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDate(): EdmTypeField<EntityT, 'Edm.Date', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Date',
      this._isNullable
    );
  }
  edmDuration(): EdmTypeField<EntityT, 'Edm.Duration', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Duration',
      this._isNullable
    );
  }
  edmTimeOfDay(): EdmTypeField<EntityT, 'Edm.TimeOfDay', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.TimeOfDay',
      this._isNullable
    );
  }
}

export { CustomField as CustomFieldV4 };
