import {
  CustomField as CustomFieldBase,
  EdmTypeClassByType
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDateTime(): EdmTypeClassByType<EntityT, 'Edm.DateTime', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTime',
      this._fieldOptions.isNullable
    );
  }
  edmTime(): EdmTypeClassByType<EntityT, 'Edm.Time', NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Time',
      this._fieldOptions.isNullable
    );
  }
}

export { CustomField as CustomFieldV2 };
