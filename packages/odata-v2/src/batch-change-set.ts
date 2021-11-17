import { v4 as uuid } from 'uuid';
// eslint-disable-next-line import/no-internal-modules
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from './entity';
import { CreateRequestBuilder } from './request-builder/create-request-builder';
import { UpdateRequestBuilder } from './request-builder/update-request-builder';
import { DeleteRequestBuilder } from './request-builder/delete-request-builder';

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
   * @param boundary - Boundary used in the multipart request.
   */
  constructor(
    readonly requests: RequestT[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}
