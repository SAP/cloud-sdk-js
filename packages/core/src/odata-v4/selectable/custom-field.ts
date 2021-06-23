import {
  CustomField as CustomFieldBase,
  DateField,
  DurationField,
  TimeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDate(): DateField<EntityT, NullableT> {
    return new DateField<EntityT, NullableT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Date',
      this.isNullable
    );
  }
  edmDuration(): DurationField<EntityT, NullableT> {
    return new DurationField<EntityT, NullableT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Duration',
      this.isNullable
    );
  }
  edmTimeOfDay(): TimeField<EntityT, NullableT> {
    return new TimeField<EntityT, NullableT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.TimeOfDay',
      this.isNullable
    );
  }
}

export { CustomField as CustomFieldV4 };
