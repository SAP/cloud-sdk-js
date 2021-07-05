import {
  CustomField as CustomFieldBase,
  EdmTypeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDateTime(): EdmTypeField<EntityT, 'Edm.DateTime', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime',
      this._isNullable
    );
  }
  edmTime(): EdmTypeField<EntityT, 'Edm.Time', NullableT> {
    return new EdmTypeField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Time',
      this._isNullable
    );
  }
}

export { CustomField as CustomFieldV2 };
