import { v4 as uuid } from 'uuid';
import { DefaultDeSerializers, DeSerializers } from '../../de-serializers';
import { EntityBase } from '../../entity-base';
import { CreateRequestBuilderBase } from '../create-request-builder-base';
import { DeleteRequestBuilderBase } from '../delete-request-builder-base';
import { UpdateRequestBuilderBase } from '../update-request-builder-base';

/**
 * Representation of a batch change set, which holds a collection of write operations.
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
      | CreateRequestBuilderBase<EntityBase, DeSerializersT>
      | UpdateRequestBuilderBase<EntityBase, DeSerializersT>
      | DeleteRequestBuilderBase<EntityBase, DeSerializersT>
    )[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}
