/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ODataRequestConfig } from '../../../common/request-builder/request/odata-request-config';
import { ODataRequestBase } from '../../../common/request-builder/request/odata-request';

/**
 * OData request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataRequest<
  RequestConfigT extends ODataRequestConfig
> extends ODataRequestBase<RequestConfigT> {}
