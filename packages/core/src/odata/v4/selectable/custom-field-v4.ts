/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import type { EntityV4 } from '../entity-v4';
import { CustomFieldBase } from '../../common/selectable/custom-field';
import { DateField, DurationField, TimeField } from '../../common';

export class CustomFieldV4<EntityT extends EntityV4> extends CustomFieldBase<
  EntityT
> {
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
