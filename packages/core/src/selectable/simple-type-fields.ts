/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { ODataV2 } from '../odata-v2';
import { BigNumberField } from './big-number-field';
import { BinaryField } from './binary-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { NumberField } from './number-field';
import { StringField } from './string-field';
import { TimeField } from './time-field';

/**
 * @hidden
 */
export type SimpleTypeFields<
  EntityT extends Entity<Version>,
  Version = ODataV2
> =
  | BigNumberField<EntityT, Version>
  | BinaryField<EntityT, Version>
  | BooleanField<EntityT, Version>
  | DateField<EntityT, Version>
  | NumberField<EntityT, Version>
  | StringField<EntityT, Version>
  | TimeField<EntityT, Version>;
