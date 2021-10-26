import {
  CustomField as CustomFieldBase,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDateTime(): OrderableEdmTypeField<
    EntityT,
    'Edm.DateTime',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTime',
      this._fieldOptions.isNullable
    );
  }
  edmTime(): OrderableEdmTypeField<EntityT, 'Edm.Time', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Time',
      this._fieldOptions.isNullable
    );
  }
}
