import {
  CustomField as CustomFieldBase,
  DateField,
  TimeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity
> extends CustomFieldBase<EntityT> {
  edmDateTime(): DateField<EntityT> {
    return new DateField<EntityT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.DateTime'
    );
  }
  edmTime(): TimeField<EntityT> {
    return new TimeField<EntityT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Time'
    );
  }
}

export { CustomField as CustomFieldV2 };
