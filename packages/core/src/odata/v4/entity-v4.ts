/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../common';
import { CustomFieldV4 } from './selectable/custom-field-v4';

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class EntityV4 extends EntityBase {
  protected static customFieldSelector<EntityT extends EntityBase>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomFieldV4<EntityT> {
    return new CustomFieldV4(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v4' = 'v4';
}
