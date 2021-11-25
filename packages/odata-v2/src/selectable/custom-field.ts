import {
  CustomField as CustomFieldBase,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers/de-serializers';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  T extends DeSerializers,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, T, NullableT> {
  edmDateTime(): OrderableEdmTypeField<
    EntityT,
    'Edm.DateTime',
    T,
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTime',
      this._fieldOptions.isNullable
    );
  }
  edmTime(): OrderableEdmTypeField<EntityT, 'Edm.Time', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Time',
      this._fieldOptions.isNullable
    );
  }
}
