import {
  CustomField as CustomFieldBase,
  OrderableEdmTypeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDate(): OrderableEdmTypeField<EntityT, 'Edm.Date', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Date',
      this._fieldOptions.isNullable
    );
  }
  edmDuration(): OrderableEdmTypeField<
    EntityT,
    'Edm.Duration',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Duration',
      this._fieldOptions.isNullable
    );
  }
  edmTimeOfDay(): OrderableEdmTypeField<
    EntityT,
    'Edm.TimeOfDay',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.TimeOfDay',
      this._fieldOptions.isNullable
    );
  }
}

export { CustomField as CustomFieldV4 };
