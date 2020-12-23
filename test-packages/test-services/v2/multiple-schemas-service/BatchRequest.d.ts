import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSetV2, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { MultiSchemaTestEntity } from './index';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
export declare function batch(requests: Array<ReadMultipleSchemasServiceRequestBuilder | ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>>): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export declare function changeset(requests: Array<WriteMultipleSchemasServiceRequestBuilder>): ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>;
export declare const defaultMultipleSchemasServicePath = "VALUE_IS_UNDEFINED";
export declare type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilder<MultiSchemaTestEntity> | GetByKeyRequestBuilder<MultiSchemaTestEntity>;
export declare type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilder<MultiSchemaTestEntity> | UpdateRequestBuilder<MultiSchemaTestEntity> | DeleteRequestBuilder<MultiSchemaTestEntity>;
//# sourceMappingURL=BatchRequest.d.ts.map