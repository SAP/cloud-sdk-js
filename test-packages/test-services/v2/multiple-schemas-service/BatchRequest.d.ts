import { CreateRequestBuilderV2, DeleteRequestBuilderV2, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, BatchChangeSet, BatchRequestBuilder, UpdateRequestBuilderV2 } from '@sap-cloud-sdk/core';
import { MultiSchemaTestEntity } from './index';
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: (ReadMultipleSchemasServiceRequestBuilder | BatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>)[]): BatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: WriteMultipleSchemasServiceRequestBuilder[]): BatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>;
export declare const defaultMultipleSchemasServicePath = "VALUE_IS_UNDEFINED";
export declare type ReadMultipleSchemasServiceRequestBuilder = GetAllRequestBuilderV2<MultiSchemaTestEntity> | GetByKeyRequestBuilderV2<MultiSchemaTestEntity>;
export declare type WriteMultipleSchemasServiceRequestBuilder = CreateRequestBuilderV2<MultiSchemaTestEntity> | UpdateRequestBuilderV2<MultiSchemaTestEntity> | DeleteRequestBuilderV2<MultiSchemaTestEntity>;
//# sourceMappingURL=BatchRequest.d.ts.map