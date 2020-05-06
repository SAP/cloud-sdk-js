/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity as EntityBase } from '../common';

/**
 * Super class for all representations of OData entity types.
 */
export abstract class Entity extends EntityBase {
  readonly _oDataVersion: 'v2' = 'v2';
}
