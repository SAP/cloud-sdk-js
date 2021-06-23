import {
  CustomField as CustomFieldBase,
  DateField,
  TimeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDateTime(): DateField<EntityT, NullableT> {
    return new DateField<EntityT, NullableT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime',
      this.isNullable
    );
  }
  edmTime(): TimeField<EntityT, NullableT> {
    return new TimeField<EntityT, NullableT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Time',
      this.isNullable
    );
  }
}

export { CustomField as CustomFieldV2 };
