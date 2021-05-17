import {
  CustomField as CustomFieldBase,
  DateField,
  DurationField,
  TimeField
} from '../../odata-common';
import type { Entity } from '../entity';

export class CustomField<
  EntityT extends Entity
> extends CustomFieldBase<EntityT> {
  edmDate(): DateField<EntityT> {
    return new DateField<EntityT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Date'
    );
  }
  edmDuration(): DurationField<EntityT> {
    return new DurationField<EntityT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.Duration'
    );
  }
  edmTimeOfDay(): TimeField<EntityT> {
    return new TimeField<EntityT>(
      this._fieldName,
      this._entityConstructor,
      'Edm.TimeOfDay'
    );
  }
}

export { CustomField as CustomFieldV4 };
