import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core/v4';
import { People, Airlines, Airports, NewComePeople } from './index';
/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder | ODataBatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>>): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder[]): ODataBatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export declare const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath = "/sap/opu/odata/sap/Microsoft.OData.Service.Sample.TrippinInMemory.Models";
export declare type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = GetAllRequestBuilder<People> | GetAllRequestBuilder<Airlines> | GetAllRequestBuilder<Airports> | GetAllRequestBuilder<NewComePeople> | GetByKeyRequestBuilder<People> | GetByKeyRequestBuilder<Airlines> | GetByKeyRequestBuilder<Airports> | GetByKeyRequestBuilder<NewComePeople>;
export declare type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = CreateRequestBuilder<People> | UpdateRequestBuilder<People> | DeleteRequestBuilder<People> | CreateRequestBuilder<Airlines> | UpdateRequestBuilder<Airlines> | DeleteRequestBuilder<Airlines> | CreateRequestBuilder<Airports> | UpdateRequestBuilder<Airports> | DeleteRequestBuilder<Airports> | CreateRequestBuilder<NewComePeople> | UpdateRequestBuilder<NewComePeople> | DeleteRequestBuilder<NewComePeople>;
//# sourceMappingURL=BatchRequest.d.ts.map