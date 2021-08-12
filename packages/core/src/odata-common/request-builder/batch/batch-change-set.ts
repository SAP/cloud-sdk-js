import { v4 as uuid } from 'uuid';
import { MethodRequestBuilder } from '../request-builder-base';

// FIXME: MethodRequestBuilder is too broad here. Should be create, update and delete
/**
 * Representation of a batch change set, which holds a collection of write operations.
 */
export class BatchChangeSet<RequestT extends MethodRequestBuilder = any> {
  /**
   * Create an instance of BatchChangeSet.
   * @param requests - Requests to combine to one change set.
   * @param boundary - Request boundary for separation of sub requests. Defaults to an auto generated value.
   */
  constructor(
    readonly requests: RequestT[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}
