import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity, TestEntityLink } from './index';
/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export declare function batch(requests: Array<ReadAdminServiceRequestBuilder | ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: Array<WriteAdminServiceRequestBuilder>): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>;
export declare function changeset(requests: Array<WriteAdminServiceRequestBuilder>): ODataBatchChangeSetV4<WriteAdminServiceRequestBuilder>;
export declare const defaultAdminServicePath = "/admin";
export declare type ReadAdminServiceRequestBuilder = GetAllRequestBuilderV4<TestEntity> | GetAllRequestBuilderV4<TestEntityLink> | GetByKeyRequestBuilderV4<TestEntity> | GetByKeyRequestBuilderV4<TestEntityLink>;
export declare type WriteAdminServiceRequestBuilder = CreateRequestBuilderV4<TestEntity> | UpdateRequestBuilderV4<TestEntity> | DeleteRequestBuilderV4<TestEntity> | CreateRequestBuilderV4<TestEntityLink> | UpdateRequestBuilderV4<TestEntityLink> | DeleteRequestBuilderV4<TestEntityLink>;
//# sourceMappingURL=BatchRequest.d.ts.map