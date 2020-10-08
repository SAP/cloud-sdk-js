/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { BatchChangeSet } from '../common/request-builder/batch/batch-change-set';
import { EntityV4 } from './entity';
import {
  CreateRequestBuilderV4,
  DeleteRequestBuilderV4,
  UpdateRequestBuilderV4
} from './request-builder';

/**
 * @deprecated Since v1.30.0. Use [[BatchChangeSet]] directly
 * Representation of a batch change set, which holds a collection of write operations.
 */
export class ODataBatchChangeSetV4<
  RequestT extends
    | CreateRequestBuilderV4<EntityV4>
    | UpdateRequestBuilderV4<EntityV4>
    | DeleteRequestBuilderV4<EntityV4>
> implements BatchChangeSet<RequestT> {
  /**
   * @deprecated Since v1.30.0. Use [[boundary]] instead.
   */
  get changeSetId() {
    return this.boundary;
  }

  /**
   * Create an instance of ODataBatchChangeSetV4.
   * @param requests Requests to combine to one change set.
   * @param boundary Boundary used in the multipart request.
   */
  constructor(
    readonly requests: RequestT[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}
