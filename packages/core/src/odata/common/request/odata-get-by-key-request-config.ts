/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { EntityBase, Constructable } from '../entity';
import { FieldType, Selectable } from '../selectable';
import { Expandable } from '../expandable';
import { ODataUri } from '../uri-conversion';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithSelection } from './odata-request-traits';

/**
 * OData getByKey request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetByKeyRequestConfig<EntityT extends EntityBase>
  extends ODataRequestConfig
  implements WithKeys, WithSelection<EntityT> {
  keys: MapType<FieldType>;
  selects: Selectable<EntityT>[] = [];
  expands: Expandable<EntityT>[];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri
  ) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(
      this.keys,
      this.entityConstructor
    );
  }

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...this.oDataUri.getSelect(this.selects),
      ...this.oDataUri.getExpand(
        this.selects,
        this.expands,
        this.entityConstructor
      )
    });
  }
}
