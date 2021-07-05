import { CustomField as CustomFieldBase, EdmField } from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity,
  NullableT extends boolean = false
> extends CustomFieldBase<EntityT, NullableT> {
  edmDateTime(): EdmField<EntityT, 'Edm.DateTime', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime',
      this._isNullable
    );
  }
  edmTime(): EdmField<EntityT, 'Edm.Time', NullableT> {
    return new EdmField(
      this._fieldName,
      this._entityConstructor,
      'Edm.Time',
      this._isNullable
    );
  }
}

export { CustomField as CustomFieldV2 };
