import {
  CreateRequestBuilderV2,
  DeleteRequestBuilderV2,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  ODataBatchChangeSetV2,
  ODataBatchRequestBuilderV2,
  UpdateRequestBuilderV2
} from '@sap-cloud-sdk/core';
import { MultiSchemaTestEntity } from './index';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV2;
export declare function batch(
  requests: Array<
    | ReadMultipleSchemasServiceRequestBuilder
    | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>
  >
): ODataBatchRequestBuilderV2;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteMultipleSchemasServiceRequestBuilder>
): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export declare const defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
export declare type ReadMultipleSchemasServiceRequestBuilder =
  | GetAllRequestBuilderV2<MultiSchemaTestEntity>
  | GetByKeyRequestBuilderV2<MultiSchemaTestEntity>;
export declare type WriteMultipleSchemasServiceRequestBuilder =
  | CreateRequestBuilderV2<MultiSchemaTestEntity>
  | UpdateRequestBuilderV2<MultiSchemaTestEntity>
  | DeleteRequestBuilderV2<MultiSchemaTestEntity>;
//# sourceMappingURL=BatchRequest.d.ts.map
