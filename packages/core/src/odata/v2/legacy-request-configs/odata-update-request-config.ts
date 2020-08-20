/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../../common';
import { ODataUpdateRequestConfig as Base } from '../../common/request/odata-update-request-config';
import { oDataUriV2 } from '../uri-conversion';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData delete request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataUpdateRequestConfig<EntityT extends EntityBase> extends Base<
  EntityT
> {
  /**
   * Creates an instance of ODataUpdateRequestConfig.
   *
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(_entityConstructor: Constructable<EntityT>) {
    super(_entityConstructor, oDataUriV2);
  }
}
