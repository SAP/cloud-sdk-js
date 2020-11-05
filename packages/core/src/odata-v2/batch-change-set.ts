/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { BatchChangeSet } from '../odata-common/request-builder/batch/batch-change-set';
import { EntityV2 } from './entity';
import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  UpdateRequestBuilderV2
} from './request-builder';

/**
 * @deprecated Since v1.30.0. Use [[BatchChangeSet]] directly
 * Representation of a batch change set, which holds a collection of write operations.
 */
export class ODataBatchChangeSetV2<
  RequestT extends
    | CreateRequestBuilderV2<EntityV2>
    | UpdateRequestBuilderV2<EntityV2>
    | DeleteRequestBuilderV2<EntityV2>
> implements BatchChangeSet<RequestT> {
  /**
   * @deprecated Since v1.30.0. Use [[boundary]] instead.
   */
  get changeSetId() {
    return this.boundary;
  }

  /**
   * Create an instance of ODataBatchChangeSetV2.
   * @param requests Requests to combine to one change set.
   * @param boundary Boundary used in the multipart request.
   */
  constructor(
    readonly requests: RequestT[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}

export { ODataBatchChangeSetV2 as ODataBatchChangeSet };
