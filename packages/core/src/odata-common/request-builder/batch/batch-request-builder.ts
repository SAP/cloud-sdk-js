/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { AxiosResponse } from 'axios';
import { MethodRequestBuilder } from '../request-builder-base';
import { ODataBatchRequestConfig } from '../../request/odata-batch-request-config';
import { Constructable, Entity } from '../../entity';
import {
  Destination,
  DestinationNameAndJwt, DestinationOptions,
  DestinationRetrievalOptions
} from '../../../connectivity/scp-cf';
import { ODataRequest } from '../../request/odata-request';
import { BatchChangeSet } from './batch-change-set';
import { BatchSubRequestPathType } from './batch-request-options';
import { serializeBatchRequest } from './batch-request-serializer';

/**
 * Create a batch request to invoke multiple requests as a batch. The batch request builder accepts retrieve requests, i. e. [[GetAllRequestBuilder | getAll]] and [[GetByKeyRequestBuilder | getByKey]] requests and change sets, which in turn can contain [[CreateRequestBuilder | create]], [[UpdateRequestBuilder | update]] or [[DeleteRequestBuilder | delete]] requests.
 * The retrieve and change sets will be excuted in order, while the order within a change set can vary.
 */
export class BatchRequestBuilder extends MethodRequestBuilder<ODataBatchRequestConfig> {
  // FIXME: MethodRequestBuilder is too broad here. Should be getAll and getByKey
  /**
   * Creates an instance of ODataBatchRequestBuilder.
   *
   * @param defaultServicePath - Service path
   * @param requests - An array of retrieve requests or change sets
   * @param entityToConstructorMap - A map that holds the entity type to constructor mapping
   */
  constructor(
    readonly defaultServicePath: string,
    readonly requests: (BatchChangeSet | MethodRequestBuilder)[],
    readonly entityToConstructorMap: Record<string, Constructable<Entity>>
  ) {
    super(new ODataBatchRequestConfig(defaultServicePath));
  }

  withSubRequestPathType(subRequestPathType: BatchSubRequestPathType): this {
    this.requestConfig.withSubRequestPathType(subRequestPathType);
    return this;
  }

  build(): ODataRequest<ODataBatchRequestConfig>;
  build(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationRetrievalOptions
  ): Promise<ODataRequest<ODataBatchRequestConfig>>;
  build(
    destination?: Destination | DestinationNameAndJwt,
    options?: DestinationRetrievalOptions
  ):
    | ODataRequest<ODataBatchRequestConfig>
    | Promise<ODataRequest<ODataBatchRequestConfig>> {
    return destination
      ? super
          .build(destination!, options)
          .then(request => this.setPayload(request))
      : this.setPayload(super.build());
  }

  /**
   * Execute request and return the original [[AxiosResponse]].
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to an [[AxiosResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<AxiosResponse>{
    return this.build(destination, options)
      .then(request => request.executeRaw());
  }

  private setPayload(
    request: ODataRequest<ODataBatchRequestConfig>
  ): ODataRequest<ODataBatchRequestConfig> {
    request.config.payload = serializeBatchRequest(this, {
      subRequestPathType: request.config.subRequestPathType,
      destination: request.destination!
    });
    return request;
  }
}
