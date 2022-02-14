import {
  CustomField as CustomFieldBase,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, any, NullableT> {
  edmDate(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Date',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Date',
      this._fieldOptions.isNullable
    );
  }
  edmDuration(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
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
    DeSerializersT,
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
