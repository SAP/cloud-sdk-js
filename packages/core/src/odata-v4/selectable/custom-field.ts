import {
  CustomField as CustomFieldBase,
  EdmTypeClassByType
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDate(): EdmTypeClassByType<EntityT, 'Edm.Date', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Date',
      this._isNullable
    );
  }
  edmDuration(): EdmTypeClassByType<EntityT, 'Edm.Duration', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Duration',
      this._isNullable
    );
  }
  edmTimeOfDay(): EdmTypeClassByType<EntityT, 'Edm.TimeOfDay', NullableT> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.TimeOfDay',
      this._isNullable
    );
  }
}

export { CustomField as CustomFieldV4 };
