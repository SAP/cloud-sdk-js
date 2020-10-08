/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MethodRequestBuilderBase } from '../request-builder-base';
import { ODataBatchRequestConfig } from '../../request/odata-batch-request-config';
import { Constructable, EntityBase } from '../../entity';
import { serializeBatchRequest } from './batch-request-serializer';
import { BatchChangeSet } from './batch-change-set';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be excuted in order, while the order within a change set can vary.
 */
export class BatchRequestBuilder extends MethodRequestBuilderBase<
  ODataBatchRequestConfig
> {
  // FIXME: MethodRequestBuilderBase is too broad here. Should be getAll and getByKey
  /**
   * Creates an instance of ODataBatchRequestBuilder.
   *
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (BatchChangeSet | MethodRequestBuilderBase)[],
    readonly entityToConstructorMap: Record<string, Constructable<EntityBase>>
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath));
    this.requestConfig.payload = serializeBatchRequest(this);
  }
}
