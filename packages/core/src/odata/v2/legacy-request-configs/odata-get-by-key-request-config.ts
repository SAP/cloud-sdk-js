/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../../common';
import { ODataGetByKeyRequestConfig as Base } from '../../common/request/odata-get-by-key-request-config';
import { oDataUriV2 } from '../uri-conversion';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData delete request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetByKeyRequestConfig<
  EntityT extends EntityBase
> extends Base<EntityT> {
  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   *
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(_entityConstructor: Constructable<EntityT>) {
    super(_entityConstructor, oDataUriV2);
  }
}
