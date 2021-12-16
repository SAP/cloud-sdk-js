import { CreateRequestBuilder, DeleteRequestBuilder, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity1, TestEntity2, TestEntity3, TestEntity4 } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(...requests: Array<ReadMultipleSchemasServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(requests: Array<ReadMultipleSchemasServiceRequestBuilder<DeSerializersT> | BatchChangeSet<DeSerializersT>>): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(...requests: Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(requests: Array<WriteMultipleSchemasServiceRequestBuilder<DeSerializersT>>): BatchChangeSet<DeSerializersT>;
export declare const defaultMultipleSchemasServicePath = "/sap/opu/odata/sap/API_TEST_SRV";
export declare type ReadMultipleSchemasServiceRequestBuilder<DeSerializersT extends DeSerializers> = GetAllRequestBuilder<TestEntity1, DeSerializersT> | GetAllRequestBuilder<TestEntity2, DeSerializersT> | GetAllRequestBuilder<TestEntity3, DeSerializersT> | GetAllRequestBuilder<TestEntity4, DeSerializersT> | GetByKeyRequestBuilder<TestEntity1, DeSerializersT> | GetByKeyRequestBuilder<TestEntity2, DeSerializersT> | GetByKeyRequestBuilder<TestEntity3, DeSerializersT> | GetByKeyRequestBuilder<TestEntity4, DeSerializersT>;
export declare type WriteMultipleSchemasServiceRequestBuilder<DeSerializersT extends DeSerializers> = CreateRequestBuilder<TestEntity1, DeSerializersT> | UpdateRequestBuilder<TestEntity1, DeSerializersT> | DeleteRequestBuilder<TestEntity1, DeSerializersT> | CreateRequestBuilder<TestEntity2, DeSerializersT> | UpdateRequestBuilder<TestEntity2, DeSerializersT> | DeleteRequestBuilder<TestEntity2, DeSerializersT> | CreateRequestBuilder<TestEntity3, DeSerializersT> | UpdateRequestBuilder<TestEntity3, DeSerializersT> | DeleteRequestBuilder<TestEntity3, DeSerializersT> | CreateRequestBuilder<TestEntity4, DeSerializersT> | UpdateRequestBuilder<TestEntity4, DeSerializersT> | DeleteRequestBuilder<TestEntity4, DeSerializersT>;
//# sourceMappingURL=BatchRequest.d.ts.map