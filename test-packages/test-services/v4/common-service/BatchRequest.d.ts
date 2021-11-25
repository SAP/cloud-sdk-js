import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { CommonEntity, CommonEntitySingleLink } from './index';
/**
 * Batch builder for operations supported on the Common Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(
  ...requests: Array<
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export declare function batch(
  requests: Array<
    | ReadCommonServiceRequestBuilder
    | ODataBatchChangeSet<WriteCommonServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Common Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteCommonServiceRequestBuilder>
): ODataBatchChangeSet<WriteCommonServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteCommonServiceRequestBuilder>
): ODataBatchChangeSet<WriteCommonServiceRequestBuilder>;
export declare const defaultCommonServicePath =
  '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
export declare type ReadCommonServiceRequestBuilder =
  | GetAllRequestBuilder<CommonEntity>
  | GetAllRequestBuilder<CommonEntitySingleLink>
  | GetByKeyRequestBuilder<CommonEntity>
  | GetByKeyRequestBuilder<CommonEntitySingleLink>;
export declare type WriteCommonServiceRequestBuilder =
  | CreateRequestBuilder<CommonEntity>
  | UpdateRequestBuilder<CommonEntity>
  | DeleteRequestBuilder<CommonEntity>
  | CreateRequestBuilder<CommonEntitySingleLink>
  | UpdateRequestBuilder<CommonEntitySingleLink>
  | DeleteRequestBuilder<CommonEntitySingleLink>;
//# sourceMappingURL=BatchRequest.d.ts.map
