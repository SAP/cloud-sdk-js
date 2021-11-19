import {
  CustomField as CustomFieldBase,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common/internal';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, any, NullableT> {
  edmDate(): OrderableEdmTypeField<EntityT, 'Edm.Date', any, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Date',
      this._fieldOptions.isNullable
    );
  }
  edmDuration(): OrderableEdmTypeField<
    EntityT,
    'Edm.Duration',
    any,
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
    any,
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
