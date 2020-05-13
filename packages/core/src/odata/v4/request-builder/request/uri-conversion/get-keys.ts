/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Entity } from '../../../entity';
import { toPropertyFormat } from '../../../../../util';
import { Constructable } from '../../../../common';

/**
 * Helper function that maps an entity to its keys map with their original names.
 *
 * @param entity - Entity to map
 * @param entityConstructor - The constructor of the entity
 * @returns object that includes all keys that represent given entity
 */
export function getEntityKeys<EntityT extends Entity>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): MapType<any> {
  if (!entity) {
    throw new Error(
      'getEntityKeys() cannot extract keys from an undefined or null object.'
    );
  }
  return entityConstructor._keyFields.reduce(
    (prev, curr) => ({
      ...prev,
      [curr._fieldName]: entity[toPropertyFormat(curr._fieldName)]
    }),
    {}
  );
}
