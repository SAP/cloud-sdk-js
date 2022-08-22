import { v4 as uuid } from 'uuid';
import { DefaultDeSerializers, DeSerializers } from '../../de-serializers';
import { CreateRequestBuilderBase } from '../create-request-builder-base';
import { EntityBase } from '../../entity-base';
import { UpdateRequestBuilderBase } from '../update-request-builder-base';
import { DeleteRequestBuilderBase } from '../delete-request-builder-base';
import { ActionFunctionImportRequestBuilderBase } from '../action-function-import-request-builder-base';

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
    readonly requests: ChangesetBuilderTypes<DeSerializersT>[],
    readonly boundary: string = `changeset_${uuid()}`
  ) {}
}

/**
 * Some function imports contain not serializable entities and the execute() method is removed from them.
 * Since the execute method is not needed in batch the execute it is removed from all function imports.
 */
export type ChangesetBuilderTypes<DeSerializersT extends DeSerializers> =
  | CreateRequestBuilderBase<EntityBase, DeSerializersT>
  | UpdateRequestBuilderBase<EntityBase, DeSerializersT>
  | DeleteRequestBuilderBase<EntityBase, DeSerializersT>
  | Omit<ActionFunctionImportRequestBuilderBase<any, any>, 'execute'>;
