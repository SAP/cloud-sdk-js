/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../common/entity';
import { CustomField } from './selectable/custom-field';

/**
 * Super class for all representations of OData entity types.
 */
export class Entity extends EntityBase {
  protected static customFieldSelector<EntityT extends EntityBase>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomField<EntityT> {
    return new CustomField(fieldName, entityConstructor);
  }

  readonly _oDataVersion: 'v2' = 'v2';
}
