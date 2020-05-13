/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { EntityBase } from '../../entity';
import { FieldType } from '../../selectable';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';
import { UriConverter } from './uri-converter';

/**
 * OData update request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataUpdateRequestConfig<EntityT extends EntityBase>
  extends ODataRequestConfig
  implements WithKeys, WithETag {
  keys: MapType<FieldType>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataUpdateRequestConfig.
   *
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    private uriConversion: UriConverter
  ) {
    super(
      UpdateStrategy.MODIFY_WITH_PATCH,
      _entityConstructor._defaultServicePath
    );
  }

  resourcePath(): string {
    return this.uriConversion.getResourcePathForKeys(
      this.keys,
      this._entityConstructor
    );
  }

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({});
  }

  updateWithPut(): void {
    this.method = UpdateStrategy.REPLACE_WITH_PUT;
  }
}

enum UpdateStrategy {
  MODIFY_WITH_PATCH = 'patch',
  REPLACE_WITH_PUT = 'put'
}
