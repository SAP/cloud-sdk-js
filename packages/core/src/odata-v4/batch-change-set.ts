import { v4 as uuid } from 'uuid';
import { BatchChangeSet } from '../odata-common/request-builder/batch/batch-change-set';
import { Entity } from './entity';
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  UpdateRequestBuilder
} from './request-builder';

/**
 * @deprecated Since v1.30.0. Use [[BatchChangeSet]] directly
 * Representation of a batch change set, which holds a collection of write operations.
 */
export class ODataBatchChangeSet<
  RequestT extends
    | CreateRequestBuilder<Entity>
    | UpdateRequestBuilder<Entity>
    | DeleteRequestBuilder<Entity>
> implements BatchChangeSet<RequestT>
{
  /**
   * @deprecated Since v1.30.0. Use [[boundary]] instead.
   */
  get changeSetId(): string {
    return this.boundary;
  }

  /**
   * Create an instance of ODataBatchChangeSet.
   * @param requests - Requests to combine to one change set.
   * @param boundary -  Boundary used in the multipart request.
   */
  constructor(
    readonly requests: RequestT[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}

export { ODataBatchChangeSet as ODataBatchChangeSetV4 };
