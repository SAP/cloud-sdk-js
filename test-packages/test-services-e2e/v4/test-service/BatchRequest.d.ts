import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity, TestEntityLink } from './index';
/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export declare function batch(requests: Array<ReadTestServiceRequestBuilder | ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>;
export declare function changeset(requests: Array<WriteTestServiceRequestBuilder>): ODataBatchChangeSetV4<WriteTestServiceRequestBuilder>;
export declare const defaultTestServicePath = "/odata/test-service";
export declare type ReadTestServiceRequestBuilder = GetAllRequestBuilder<TestEntity> | GetAllRequestBuilder<TestEntityLink> | GetByKeyRequestBuilder<TestEntity> | GetByKeyRequestBuilder<TestEntityLink>;
export declare type WriteTestServiceRequestBuilder = CreateRequestBuilder<TestEntity> | UpdateRequestBuilder<TestEntity> | DeleteRequestBuilder<TestEntity> | CreateRequestBuilder<TestEntityLink> | UpdateRequestBuilder<TestEntityLink> | DeleteRequestBuilder<TestEntityLink>;
//# sourceMappingURL=BatchRequest.d.ts.map