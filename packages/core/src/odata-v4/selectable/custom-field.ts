import type { EntityV4 } from '../entity';
import {
  CustomFieldBase,
  DateField,
  DurationField,
  TimeField
} from '../../odata-common';
import { DataTimeDefault, DateTime } from '../../temporal-deserializers';

export class CustomFieldV4<
  EntityT extends EntityV4<DateTimeT>,
  DateTimeT extends DateTime = DataTimeDefault
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
