import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity, TestEntityLink } from './index';
/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSet<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilder;
export declare function batch(requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSet<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export declare function changeset(requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSet<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = "/odata/test-service";
export declare type ReadTestServiceRequestBuilder = GetAllRequestBuilder<TestEntity> | GetAllRequestBuilder<TestEntityLink> | GetByKeyRequestBuilder<TestEntity> | GetByKeyRequestBuilder<TestEntityLink>;
export declare type WriteTestServiceRequestBuilder = CreateRequestBuilder<TestEntity> | UpdateRequestBuilder<TestEntity> | DeleteRequestBuilder<TestEntity> | CreateRequestBuilder<TestEntityLink> | UpdateRequestBuilder<TestEntityLink> | DeleteRequestBuilder<TestEntityLink>;
//# sourceMappingURL=BatchRequest.d.ts.map