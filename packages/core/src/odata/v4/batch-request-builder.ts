/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause } from '@sap-cloud-sdk/util';
import { v4 as uuid } from 'uuid';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions,
  toDestinationNameUrl
} from '../../scp-cf';
import { Constructable, BatchResponse } from '../common';
import { MethodRequestBuilderBase } from '../common/request-builder/request-builder-base';
import { ODataBatchRequestConfig } from '../common/request/odata-batch-request-config';
import { EntityV4 } from './entity';
import {
  ODataBatchChangeSetV4,
  serializeBatchRequest
} from './batch-request-serializer';
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  UpdateRequestBuilderV4
} from './request-builder';
import { parseBatchResponse } from './batch-response-parser';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be excuted in order, while the order within a change set can vary.
 */
export class ODataBatchRequestBuilderV4 extends MethodRequestBuilderBase<
  ODataBatchRequestConfig
> {
  /**
   * Creates an instance of ODataBatchRequestBuilder.
   *
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (
      | ODataBatchChangeSetV4<
          | CreateRequestBuilderV4<EntityV4>
          | UpdateRequestBuilderV4<EntityV4>
          | DeleteRequestBuilderV4<EntityV4>
        >
      | GetAllRequestBuilderV4<EntityV4>
      | GetByKeyRequestBuilderV4<EntityV4>
    )[],
    readonly entityToConstructorMap: Record<string, Constructable<EntityV4>>
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath, uuid()));
    this.requestConfig.payload = serializeBatchRequest(this);
  }

  /**
   * Execute the given request and return the according promise. Please notice: The sub-requests may fail even the main request is successful.
   *
   * @param destination - Targeted destination on which the request is performed.
   * @param options - Options to employ when fetching destinations.
   * @returns Promise resolving to the requested data.
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<BatchResponse[]> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response =>
        parseBatchResponse(response, this.entityToConstructorMap)
      )
      .catch(error =>
        Promise.reject(
          errorWithCause(
            `The batch request failed! The destination provided: ${toDestinationNameUrl(
              destination
            )} and the options: ${options}.`,
            error
          )
        )
      );
  }
}
