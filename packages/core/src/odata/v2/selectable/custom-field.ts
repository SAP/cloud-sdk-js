/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import type { Entity } from '../entity';
import { CustomFieldBase } from '../../common/selectable/custom-field';
import { DateField, TimeField } from '../../common';

export class CustomField<EntityT extends Entity> extends CustomFieldBase<
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
