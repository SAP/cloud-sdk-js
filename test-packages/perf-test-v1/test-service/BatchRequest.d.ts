import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity, TestEntityLink, TestEntity50Col, TestEntity100Col } from './index';
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
export declare type ReadTestServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity> | GetAllRequestBuilderV4<TestEntityLink> | GetAllRequestBuilderV4<TestEntity50Col> | GetAllRequestBuilderV4<TestEntity100Col> | GetByKeyRequestBuilderV4<TestEntity> | GetByKeyRequestBuilderV4<TestEntityLink> | GetByKeyRequestBuilderV4<TestEntity50Col> | GetByKeyRequestBuilderV4<TestEntity100Col>;
export declare type WriteTestServiceRequestBuilder = CreateRequestBuilderV4<TestEntity> | UpdateRequestBuilderV4<TestEntity> | DeleteRequestBuilderV4<TestEntity> | CreateRequestBuilderV4<TestEntityLink> | UpdateRequestBuilderV4<TestEntityLink> | DeleteRequestBuilderV4<TestEntityLink> | CreateRequestBuilderV4<TestEntity50Col> | UpdateRequestBuilderV4<TestEntity50Col> | DeleteRequestBuilderV4<TestEntity50Col> | CreateRequestBuilderV4<TestEntity100Col> | UpdateRequestBuilderV4<TestEntity100Col> | DeleteRequestBuilderV4<TestEntity100Col>;
//# sourceMappingURL=BatchRequest.d.ts.map