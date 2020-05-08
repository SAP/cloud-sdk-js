/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { EntityBase } from '../../entity';
import { FieldType, Selectable } from '../../selectable';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithSelection } from './odata-request-traits';
import { UriConverter } from './uri-converter';

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

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly entityConstructor: Constructable<EntityT>,
    private uriConversion: UriConverter
  ) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.uriConversion.getResourcePathForKeys(
      this.keys,
      this.entityConstructor
    );
  }

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...this.uriConversion.getQueryParametersForSelection(this.selects)
    });
  }
}
