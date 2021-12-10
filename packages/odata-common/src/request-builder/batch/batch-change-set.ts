import { v4 as uuid } from 'uuid';
import { DefaultDeSerializers, DeSerializers } from '../../de-serializers';
import { CreateRequestBuilderBase } from '../create-request-builder-base';
import { DeleteRequestBuilderBase } from '../delete-request-builder-base';
import { UpdateRequestBuilderBase } from '../update-request-builder-base';

// FIXME: MethodRequestBuilder is too broad here. Should be create, update and delete
/**
 * Representation of a batch change set, which holds a collection of write operations.
 * @internal
 */
export class BatchChangeSet<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Create an instance of BatchChangeSet.
   * @param requests - Requests to combine to one change set.
   * @param boundary - Request boundary for separation of sub requests. Defaults to an auto generated value.
   */
  constructor(
    readonly requests: (
      | CreateRequestBuilderBase<any, DeSerializersT>
      | UpdateRequestBuilderBase<any, DeSerializersT>
      | DeleteRequestBuilderBase<any, DeSerializersT>
    )[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}
