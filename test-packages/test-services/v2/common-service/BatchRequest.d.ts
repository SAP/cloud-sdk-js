import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { CommonEntity } from './index';
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
  | GetByKeyRequestBuilder<CommonEntity>;
export declare type WriteCommonServiceRequestBuilder =
  | CreateRequestBuilder<CommonEntity>
  | UpdateRequestBuilder<CommonEntity>
  | DeleteRequestBuilder<CommonEntity>;
//# sourceMappingURL=BatchRequest.d.ts.map
