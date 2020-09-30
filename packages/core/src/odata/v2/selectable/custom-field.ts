import type { EntityV2 } from '../entity';
import { CustomFieldBase } from '../../common/selectable/custom-field';
import { DateField, TimeField } from '../../common';

export class CustomFieldV2<EntityT extends EntityV2> extends CustomFieldBase<
  EntityT
> {
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

export { CustomFieldV2 as CustomField };
