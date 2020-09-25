/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { pick } from 'rambda';
import { EntityBase } from '../entity';
import { GetAllRequestBuilderV2 } from '../../v2/request-builder';
import { GetAllRequestBuilderV4 } from '../../v4/request-builder';
import { removeTrailingSlashes } from '../../../util';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData count request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataCountRequestConfig<
  EntityT extends EntityBase
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataGetAllRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly getAllRequest:
      | GetAllRequestBuilderV2<EntityT>
      | GetAllRequestBuilderV4<EntityT>
  ) {
    super('get', getAllRequest._entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return `${removeTrailingSlashes(
      this.getAllRequest._entityConstructor._entityName
    )}/$count`;
  }

  queryParameters(): MapType<any> {
    const parametersAllowedInCount = ['$apply', '$search', '$filter'];
    const allParams = this.getAllRequest.requestConfig.queryParameters();
    return pick(parametersAllowedInCount, allParams);
  }
}
